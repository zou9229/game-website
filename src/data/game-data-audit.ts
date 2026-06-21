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
      launchMvpPercent: 90,
      operatingSystemPercent: 58,
      currentStage:
        'Public SEO MVP is live, submitted to GSC and Bing, deployed on Cloudflare, and now has guide-site navigation, media, AdSense readiness, source-check controls, and a clearer 99 Nights route map. The next work is deeper keyword coverage, safer source-to-data publishing, and honest language expansion.',
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
        'Codes, update checks, and Roblox metadata can be source-checked automatically first, but publishing still needs a source trail and review.',
      manualReview:
        'Guide, tier-list, animal, class, crafting, and route pages stay manual-review because wrong game data damages trust.',
      futureAiReview:
        'Community submissions can later use AI review for spam, toxicity, duplicate claims, and source quality; uncertain claims should route to human review.',
    },
    syncPlan: {
      title: 'Safe game-data update workflow',
      summary:
        'Use the admin audit and source-check controls as the control panel: detect stale pages first, check trusted sources, then publish only verified changes.',
      steps: [
        {
          label: 'Detect',
          detail:
            'Run the freshness audit and watch GSC queries, Semrush long tails, Roblox metadata, and page-level checked dates.',
        },
        {
          label: 'Check',
          detail:
            'Run source check for code pages and Roblox metadata before touching the data files.',
        },
        {
          label: 'Review',
          detail:
            'Keep guides, tier lists, classes, animals, crafting, and route pages under manual review unless a source-backed change is clear.',
        },
        {
          label: 'Publish',
          detail:
            'Update structured data, run pnpm game-data:audit and pnpm build, then deploy only after the checks pass.',
        },
      ],
      automationCandidates: items
        .filter((item) => item.owner === 'automation-candidate')
        .map((item) => item.title),
      manualReviewCount: items.filter((item) => item.owner === 'manual-review')
        .length,
    },
    actions,
    items,
    nextStep:
      actions[0]?.action ??
      'No urgent data action. Run source check after code/update changes, then continue keyword expansion and validated language-market testing.',
  };
}
