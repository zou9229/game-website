import {
  getFreshnessAgeDays,
  getFreshnessStatus,
  type FreshnessEntry,
  type FreshnessStatus,
  ninetyNineNightsFreshnessEntries,
} from '@/data/99-nights-freshness';

export type FreshnessPriority = 'high' | 'medium' | 'low';

export type FreshnessAuditItem = FreshnessEntry & {
  ageDays: number;
  status: FreshnessStatus;
  priority: FreshnessPriority;
  recommendedAction: string;
};

export type FreshnessAuditAction = {
  title: string;
  href: string;
  priority: FreshnessPriority;
  status: FreshnessStatus;
  owner: FreshnessEntry['owner'];
  action: string;
};

const statusRank: Record<FreshnessStatus, number> = {
  stale: 0,
  'due-soon': 1,
  fresh: 2,
};

const priorityRank: Record<FreshnessPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function getPriority(
  entry: FreshnessEntry,
  status: FreshnessStatus
): FreshnessPriority {
  if (status === 'stale') return 'high';
  if (status === 'due-soon' && entry.owner === 'automation-candidate') {
    return 'high';
  }
  if (status === 'due-soon') return 'medium';
  if (entry.owner === 'automation-candidate') return 'medium';
  return 'low';
}

function getRecommendedAction(
  entry: FreshnessEntry,
  status: FreshnessStatus
) {
  if (status === 'stale' && entry.owner === 'automation-candidate') {
    return 'Run source checks now, then update the data file only if at least one trusted source changed.';
  }

  if (status === 'stale') {
    return 'Manual review required before changing the page. Do not publish scraped guide data without source confirmation.';
  }

  if (status === 'due-soon' && entry.owner === 'automation-candidate') {
    return 'Queue this for the next lightweight source check. Codes and update metadata are the first automation candidates.';
  }

  if (status === 'due-soon') {
    return 'Review after the next confirmed game update or if GSC shows impressions for this page.';
  }

  if (entry.owner === 'automation-candidate') {
    return 'Keep monitoring. This can become a scheduled check before guide pages are automated.';
  }

  return 'No action now. Keep this page manual-review unless reliable source data changes.';
}

export function buildGameDataFreshnessAudit(now = new Date()) {
  const items: FreshnessAuditItem[] = ninetyNineNightsFreshnessEntries
    .map((entry) => {
      const ageDays = getFreshnessAgeDays(entry.checkedAt, now);
      const status = getFreshnessStatus(entry, now);
      const priority = getPriority(entry, status);

      return {
        ...entry,
        ageDays,
        status,
        priority,
        recommendedAction: getRecommendedAction(entry, status),
      };
    })
    .sort((a, b) => {
      const statusDiff = statusRank[a.status] - statusRank[b.status];
      if (statusDiff !== 0) return statusDiff;

      const priorityDiff = priorityRank[a.priority] - priorityRank[b.priority];
      if (priorityDiff !== 0) return priorityDiff;

      return b.ageDays - a.ageDays;
    });

  const actions: FreshnessAuditAction[] = items
    .filter(
      (item) =>
        item.status !== 'fresh' || item.owner === 'automation-candidate'
    )
    .map((item) => ({
      title: item.title,
      href: item.href,
      priority: item.priority,
      status: item.status,
      owner: item.owner,
      action: item.recommendedAction,
    }));

  return {
    generatedAt: now.toISOString(),
    roadmap: {
      launchMvpPercent: 83,
      operatingSystemPercent: 48,
      currentStage:
        'Public SEO MVP is live, submitted to GSC, deployed on Cloudflare, and now has basic media plus AdSense readiness. The next work is deeper keyword coverage, source-checked updates, honest language expansion, and safer automation.',
    },
    summary: {
      total: items.length,
      fresh: items.filter((item) => item.status === 'fresh').length,
      dueSoon: items.filter((item) => item.status === 'due-soon').length,
      stale: items.filter((item) => item.status === 'stale').length,
      automationCandidates: items.filter(
        (item) => item.owner === 'automation-candidate'
      ).length,
      manualReview: items.filter((item) => item.owner === 'manual-review')
        .length,
    },
    sourcePolicy: {
      automationCandidate:
        'Codes, update checks, and Roblox metadata can be checked automatically first, but publishing still needs a source trail.',
      manualReview:
        'Guide, tier-list, animal, class, crafting, and route pages stay manual-review because wrong game data damages trust.',
      futureAiReview:
        'Community submissions can later use AI review for spam, toxicity, duplicate claims, and source quality; uncertain claims should route to human review.',
    },
    actions,
    items,
    nextStep:
      actions[0]?.action ??
      'No urgent data action. Continue keyword expansion, source monitoring, and validated language-market testing.',
  };
}
