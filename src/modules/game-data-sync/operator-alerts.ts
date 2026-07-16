import {
  buildGameDataFreshnessAudit,
  type FreshnessPriority,
} from '@/data/game-data-audit';

import {
  buildFreshnessOverridesFromSourceCheck,
  type GameDataSourceCheckSnapshot,
} from '@/lib/game-data-source-check';

export type GameDataOperatorAlert = {
  priority: FreshnessPriority;
  title: string;
  detail: string;
  action: string;
};

export type GameDataOperatorAlertNotification = {
  configured: boolean;
  sent: boolean;
  alertCount: number;
  deliveredCount: number;
  skippedReason?: string;
  status?: number;
  error?: string;
};

const priorityRank: Record<FreshnessPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function getOperatorWebhookUrl() {
  return process.env.GAME_DATA_ALERT_WEBHOOK_URL?.trim() || '';
}

function getOperatorWebhookFormat() {
  const format =
    process.env.GAME_DATA_ALERT_WEBHOOK_FORMAT?.trim() || 'generic';
  return format.toLowerCase();
}

function getMinPriority(): FreshnessPriority {
  const value = process.env.GAME_DATA_ALERT_MIN_PRIORITY?.trim().toLowerCase();
  if (value === 'low' || value === 'medium' || value === 'high') {
    return value;
  }

  return 'high';
}

function isAtOrAbovePriority(
  priority: FreshnessPriority,
  minimum: FreshnessPriority
) {
  return priorityRank[priority] <= priorityRank[minimum];
}

export function buildGameDataOperatorAlerts(
  snapshot: GameDataSourceCheckSnapshot
): GameDataOperatorAlert[] {
  const audit = buildGameDataFreshnessAudit(
    new Date(snapshot.generatedAt),
    buildFreshnessOverridesFromSourceCheck(snapshot)
  );
  const alerts: GameDataOperatorAlert[] = [];
  const staleHighItems = audit.items.filter(
    (item) => item.status === 'stale' && item.priority === 'high'
  );

  if (staleHighItems.length > 0) {
    alerts.push({
      priority: 'high',
      title: `${staleHighItems.length} high-priority guide pages need manual review`,
      detail: staleHighItems
        .slice(0, 8)
        .map((item) => `${item.title} (${item.ageDays}d old)`)
        .join(', '),
      action:
        'Open /admin/game-data, review source trails, then update only source-confirmed guide facts.',
    });
  }

  if (snapshot.reviewPlan?.state === 'blocked') {
    alerts.push({
      priority: 'high',
      title: snapshot.reviewPlan.title,
      detail: snapshot.reviewPlan.summary,
      action:
        'Do not publish code, reward, or metadata changes. Open sources manually first.',
    });
  } else if (snapshot.reviewPlan?.state === 'review-before-publish') {
    alerts.push({
      priority: 'high',
      title: snapshot.reviewPlan.title,
      detail: snapshot.reviewPlan.summary,
      action:
        'Keep public data conservative and use the admin Copy Codex prompt before publishing changes.',
    });
  }

  if (snapshot.attentionCount > 0) {
    const attentionSources = snapshot.results
      .filter((result) => !result.ok)
      .map((result) => result.sourceName)
      .slice(0, 5)
      .join(', ');

    alerts.push({
      priority: 'medium',
      title: `${snapshot.attentionCount} source-check target(s) need review`,
      detail: attentionSources || 'One or more source-check targets failed.',
      action:
        'Treat failed source checks as review signals, not evidence that live data changed.',
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      priority: 'low',
      title: 'Game-data source check is healthy',
      detail:
        'No high-priority operator alert was generated from the latest scheduled source check.',
      action: 'Keep monitoring GSC and wait for real query or source signals.',
    });
  }

  return alerts;
}

function formatAlertText(
  snapshot: GameDataSourceCheckSnapshot,
  alerts: GameDataOperatorAlert[]
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ||
    'https://questcodes.com';
  const lines = [
    'Quest Codes game-data operator alert',
    `Generated: ${snapshot.generatedAt}`,
    `Reason: ${snapshot.reason}`,
    `Source check: ${snapshot.healthySources}/${snapshot.sourceCount} healthy, ${snapshot.attentionCount} need review`,
    `Decision: ${snapshot.reviewPlan.title}`,
    '',
    ...alerts.flatMap((alert, index) => [
      `${index + 1}. [${alert.priority}] ${alert.title}`,
      `   Detail: ${alert.detail}`,
      `   Action: ${alert.action}`,
    ]),
    '',
    `Admin: ${baseUrl}/admin/game-data`,
  ];

  return lines.join('\n');
}

function buildWebhookBody(
  format: string,
  text: string,
  snapshot: GameDataSourceCheckSnapshot,
  alerts: GameDataOperatorAlert[]
) {
  if (format === 'slack') {
    return { text };
  }

  if (format === 'discord') {
    return { content: text.slice(0, 1900) };
  }

  if (format === 'feishu' || format === 'lark') {
    return {
      msg_type: 'text',
      content: {
        text,
      },
    };
  }

  return {
    type: 'questcodes.gameData.operatorAlert',
    text,
    content: text,
    generatedAt: snapshot.generatedAt,
    sourceCheck: {
      reason: snapshot.reason,
      sourceCount: snapshot.sourceCount,
      healthySources: snapshot.healthySources,
      attentionCount: snapshot.attentionCount,
      decision: snapshot.reviewPlan.state,
    },
    alerts,
  };
}

export async function sendGameDataOperatorAlert(
  snapshot: GameDataSourceCheckSnapshot
): Promise<GameDataOperatorAlertNotification> {
  const webhookUrl = getOperatorWebhookUrl();
  if (!webhookUrl) {
    return {
      configured: false,
      sent: false,
      alertCount: 0,
      deliveredCount: 0,
      skippedReason: 'GAME_DATA_ALERT_WEBHOOK_URL is not configured.',
    };
  }

  const minimumPriority = getMinPriority();
  const alerts = buildGameDataOperatorAlerts(snapshot).filter((alert) =>
    isAtOrAbovePriority(alert.priority, minimumPriority)
  );

  if (alerts.length === 0) {
    return {
      configured: true,
      sent: false,
      alertCount: 0,
      deliveredCount: 0,
      skippedReason: `No operator alert met the ${minimumPriority} priority threshold.`,
    };
  }

  try {
    const text = formatAlertText(snapshot, alerts);
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(
        buildWebhookBody(getOperatorWebhookFormat(), text, snapshot, alerts)
      ),
    });

    return {
      configured: true,
      sent: response.ok,
      alertCount: alerts.length,
      deliveredCount: response.ok ? alerts.length : 0,
      status: response.status,
      error: response.ok
        ? undefined
        : `Webhook returned HTTP ${response.status}.`,
    };
  } catch (error: any) {
    return {
      configured: true,
      sent: false,
      alertCount: alerts.length,
      deliveredCount: 0,
      error: error?.message || 'Webhook notification failed.',
    };
  }
}
