import handler from 'vinext/server/app-router-entry';

import { getAllConfigs } from '@/modules/config/service';
import {
  runGameDataAiReview,
  runGameDataSourceCheck,
} from '@/modules/game-data-sync/service';

type WorkerEnv = {
  ASSETS?: {
    fetch(request: Request): Promise<Response> | Response;
  };
};

type ScheduledEvent = {
  cron: string;
  scheduledTime: number;
};

type ExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
};

async function runScheduledGameDataSourceCheck(event: ScheduledEvent) {
  const snapshot = await runGameDataSourceCheck('cloudflare-cron', {
    notifyOperator: true,
  });
  const configs = await getAllConfigs();
  const autoAiReviewEnabled =
    configs.game_data_auto_ai_review_enabled === 'true';
  let aiReviewStatus = autoAiReviewEnabled
    ? 'skipped-sources-healthy'
    : 'disabled';

  if (autoAiReviewEnabled && snapshot.reviewPlan.state !== 'safe-to-monitor') {
    try {
      const review = await runGameDataAiReview(configs, 'cloudflare-cron-auto');
      aiReviewStatus = `${review.decision}:${review.model}`;
    } catch (error: any) {
      aiReviewStatus = `failed:${error?.message || 'unknown error'}`;
    }
  }

  console.log(
    [
      '[questcodes] scheduled game-data source check completed',
      `cron=${event.cron}`,
      `healthy=${snapshot.healthySources}/${snapshot.sourceCount}`,
      `attention=${snapshot.attentionCount}`,
      `ai-review=${aiReviewStatus}`,
      snapshot.notification
        ? `notification=${snapshot.notification.sent ? 'sent' : snapshot.notification.skippedReason || snapshot.notification.error || 'not-sent'}`
        : 'notification=not-configured',
    ].join(' ')
  );
}

export default {
  fetch(request: Request, env: WorkerEnv, ctx: ExecutionContext) {
    return handler.fetch(request, env, ctx);
  },

  scheduled(event: ScheduledEvent, _env: WorkerEnv, ctx: ExecutionContext) {
    ctx.waitUntil(runScheduledGameDataSourceCheck(event));
  },
};
