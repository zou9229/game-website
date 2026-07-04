export type GameDataSourceKind = 'codes' | 'metadata' | 'updates';

export type GameDataSourceCheckTarget = {
  id: string;
  title: string;
  kind: GameDataSourceKind;
  sourceName: string;
  url: string;
  expectedTerms: string[];
  highRiskTerms?: string[];
  parser?: 'html' | 'roblox-game-api';
};

export type GameDataSourceSignal = {
  label: string;
  value: string;
};

export type GameDataSourceCheckResult = {
  id: string;
  title: string;
  kind: GameDataSourceKind;
  sourceName: string;
  url: string;
  checkedAt: string;
  ok: boolean;
  httpStatus?: number;
  contentType?: string;
  matchedTerms: string[];
  missingTerms: string[];
  highRiskMatches: string[];
  signals: GameDataSourceSignal[];
  action: string;
  error?: string;
};

export type GameDataSourceReviewPlan = {
  state: 'safe-to-monitor' | 'review-before-publish' | 'blocked';
  title: string;
  summary: string;
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    label: string;
    detail: string;
  }[];
};

export type GameDataSourceCheckSnapshot = {
  generatedAt: string;
  reason: string;
  sourceCount: number;
  healthySources: number;
  attentionCount: number;
  reviewPlan: GameDataSourceReviewPlan;
  results: GameDataSourceCheckResult[];
};

const SOURCE_CHECK_TARGETS: GameDataSourceCheckTarget[] = [
  {
    id: 'pc-gamer-99-nights-codes',
    title: '99 Nights codes',
    kind: 'codes',
    sourceName: 'PC Gamer',
    url: 'https://www.pcgamer.com/games/roblox/99-nights-in-the-forest-codes/',
    expectedTerms: ['forestwakesup26', 'afterparty'],
    highRiskTerms: ['happyhalloween'],
  },
  {
    id: 'pcgamesn-99-nights-codes',
    title: '99 Nights codes',
    kind: 'codes',
    sourceName: 'PCGamesN',
    url: 'https://www.pcgamesn.com/99-nights-in-the-forest/codes',
    expectedTerms: ['forestwakesup26', 'afterparty'],
    highRiskTerms: ['happyhalloween', 'yay fishing'],
  },
  {
    id: 'gamesradar-99-nights-codes',
    title: '99 Nights codes',
    kind: 'codes',
    sourceName: 'GamesRadar',
    url: 'https://www.gamesradar.com/games/survival/99-nights-in-the-forest-codes/',
    expectedTerms: ['forestwakesup26', 'afterparty'],
    highRiskTerms: ['happyhalloween'],
  },
  {
    id: 'fandom-99-nights-codes',
    title: '99 Nights wiki codes',
    kind: 'codes',
    sourceName: 'Fandom Codes Wiki',
    url: 'https://99-nights-in-the-forest.fandom.com/wiki/Codes',
    expectedTerms: ['forestwakesup26', 'afterparty'],
    highRiskTerms: ['happyhalloween', 'yay fishing'],
  },
  {
    id: 'roblox-99-nights-metadata',
    title: 'Roblox game metadata',
    kind: 'metadata',
    sourceName: 'Roblox Games API',
    url: 'https://games.roblox.com/v1/games?universeIds=7326934954',
    expectedTerms: ['99 Nights in the Forest'],
    parser: 'roblox-game-api',
  },
];

function getSourceCheckTimeoutMs() {
  const value = Number(process.env.GAME_DATA_SOURCE_CHECK_TIMEOUT_MS);
  if (Number.isFinite(value) && value >= 3000) return value;

  return 15_000;
}

function lowerIncludes(source: string, term: string) {
  return source.toLowerCase().includes(term.toLowerCase());
}

function extractTitle(html: string) {
  return html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
}

function compactText(input: string) {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildAction(result: Omit<GameDataSourceCheckResult, 'action'>) {
  if (!result.ok) {
    return 'Open this source manually before changing live content. Network or source-page failures should not change the site.';
  }

  if (result.missingTerms.length > 0) {
    return 'Expected terms were not found. Treat this as a review flag, not an automatic content update.';
  }

  if (result.highRiskMatches.length > 0) {
    return 'Expected active terms are present, but high-risk terms also appeared. Review status labels before changing code tables.';
  }

  return 'Expected terms were found. No content change is implied unless status, rewards, or source wording changed during manual review.';
}

async function checkRobloxGameApi(
  target: GameDataSourceCheckTarget,
  response: Response,
  checkedAt: string
): Promise<GameDataSourceCheckResult> {
  const raw = await response.text();
  const payload = JSON.parse(raw);
  const game = payload?.data?.[0];
  const sourceText = JSON.stringify(game ?? payload);
  const matchedTerms = target.expectedTerms.filter((term) =>
    lowerIncludes(sourceText, term)
  );
  const missingTerms = target.expectedTerms.filter(
    (term) => !matchedTerms.includes(term)
  );
  const signals: GameDataSourceSignal[] = [];

  if (game) {
    for (const [label, value] of [
      ['Name', game.name],
      ['Updated', game.updated],
      ['Playing', game.playing],
      ['Visits', game.visits],
      ['Favorites', game.favoritedCount],
    ]) {
      if (value !== undefined && value !== null) {
        signals.push({ label, value: String(value) });
      }
    }
  }

  const base = {
    id: target.id,
    title: target.title,
    kind: target.kind,
    sourceName: target.sourceName,
    url: target.url,
    checkedAt,
    ok: response.ok && !!game && missingTerms.length === 0,
    httpStatus: response.status,
    contentType: response.headers.get('content-type') ?? undefined,
    matchedTerms,
    missingTerms,
    highRiskMatches: [],
    signals,
  };

  return { ...base, action: buildAction(base) };
}

async function checkHtmlSource(
  target: GameDataSourceCheckTarget,
  response: Response,
  checkedAt: string
): Promise<GameDataSourceCheckResult> {
  const html = await response.text();
  const searchable = compactText(html.slice(0, 2_000_000));
  const matchedTerms = target.expectedTerms.filter((term) =>
    lowerIncludes(searchable, term)
  );
  const missingTerms = target.expectedTerms.filter(
    (term) => !matchedTerms.includes(term)
  );
  const highRiskMatches = (target.highRiskTerms ?? []).filter((term) =>
    lowerIncludes(searchable, term)
  );
  const title = extractTitle(html);
  const signals = title ? [{ label: 'Page title', value: title }] : [];

  const base = {
    id: target.id,
    title: target.title,
    kind: target.kind,
    sourceName: target.sourceName,
    url: target.url,
    checkedAt,
    ok: response.ok && missingTerms.length === 0,
    httpStatus: response.status,
    contentType: response.headers.get('content-type') ?? undefined,
    matchedTerms,
    missingTerms,
    highRiskMatches,
    signals,
  };

  return { ...base, action: buildAction(base) };
}

async function checkTarget(
  target: GameDataSourceCheckTarget,
  checkedAt: string
): Promise<GameDataSourceCheckResult> {
  const controller = new AbortController();
  const timeoutMs = getSourceCheckTimeoutMs();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(target.url, {
      signal: controller.signal,
      headers: {
        accept:
          target.parser === 'roblox-game-api'
            ? 'application/json'
            : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'user-agent':
          'QuestCodesBot/1.0 (+https://questcodes.com; source freshness check)',
      },
    });

    if (target.parser === 'roblox-game-api') {
      return checkRobloxGameApi(target, response, checkedAt);
    }

    return checkHtmlSource(target, response, checkedAt);
  } catch (error: any) {
    const timedOut =
      error?.name === 'AbortError' ||
      error?.message === 'This operation was aborted';
    const base = {
      id: target.id,
      title: target.title,
      kind: target.kind,
      sourceName: target.sourceName,
      url: target.url,
      checkedAt,
      ok: false,
      matchedTerms: [],
      missingTerms: target.expectedTerms,
      highRiskMatches: [],
      signals: [],
      error: timedOut
        ? `Source check timed out after ${timeoutMs}ms.`
        : error?.message || 'Source check failed.',
    };

    return { ...base, action: buildAction(base) };
  } finally {
    clearTimeout(timeout);
  }
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

export function buildGameDataSourceReviewPlan(
  results: GameDataSourceCheckResult[]
): GameDataSourceReviewPlan {
  const codeResults = results.filter((result) => result.kind === 'codes');
  const metadataResults = results.filter(
    (result) => result.kind === 'metadata'
  );
  const healthyCodeSources = codeResults.filter((result) => result.ok);
  const blockedSources = results.filter((result) => !result.ok);
  const highRiskTerms = unique(
    codeResults.flatMap((result) => result.highRiskMatches)
  );
  const matchedCodeTerms = unique(
    healthyCodeSources.flatMap((result) => result.matchedTerms)
  );
  const metadataBlocked = metadataResults.some((result) => !result.ok);

  if (healthyCodeSources.length === 0) {
    return {
      state: 'blocked',
      title: 'No trusted code source confirmed the tracked active terms',
      summary:
        'Do not update public code data from this check. Open the sources manually and keep the live page conservative until at least one trusted source confirms the current active terms.',
      recommendations: [
        {
          priority: 'high',
          label: 'Manual source review required',
          detail:
            'Open PC Gamer, GamesRadar, PCGamesN, and Fandom in a browser before changing the active, special, or expired code tables.',
        },
        {
          priority: 'high',
          label: 'Do not publish automatic changes',
          detail:
            'A failed source check is a review signal, not evidence that a code expired or a reward changed.',
        },
      ],
    };
  }

  const recommendations: GameDataSourceReviewPlan['recommendations'] = [
    {
      priority: blockedSources.length ? 'high' : 'medium',
      label: 'Keep publishing manual',
      detail:
        'Source checks can justify a review queue, but they should not rewrite code tables, commit files, or deploy by themselves.',
    },
    {
      priority: 'medium',
      label: 'Confirmed active terms',
      detail: matchedCodeTerms.length
        ? `${matchedCodeTerms.join(', ')} appeared in ${healthyCodeSources
            .map((result) => result.sourceName)
            .join(' and ')}.`
        : 'Tracked active terms appeared in healthy code sources.',
    },
  ];

  if (highRiskTerms.length) {
    recommendations.push({
      priority: 'high',
      label: 'Review status labels',
      detail: `${highRiskTerms.join(', ')} also appeared. Confirm whether each term is active, special, or expired before changing visible labels.`,
    });
  }

  if (blockedSources.length) {
    recommendations.push({
      priority: 'high',
      label: 'Open blocked sources manually',
      detail: `${blockedSources
        .map((result) => result.sourceName)
        .join(
          ', '
        )} need manual review because the command-line check could not confirm the expected terms.`,
    });
  }

  if (metadataBlocked) {
    recommendations.push({
      priority: 'medium',
      label: 'Do not refresh Roblox stats yet',
      detail:
        'Roblox metadata was not confirmed by the source check. Keep stored game stats unchanged unless the official page or API can be checked manually.',
    });
  }

  if (!blockedSources.length && !highRiskTerms.length) {
    recommendations.push({
      priority: 'low',
      label: 'No content change implied',
      detail:
        'All expected terms were found. Continue monitoring GSC and only publish if source wording, rewards, or status labels changed.',
    });
  }

  return {
    state:
      blockedSources.length || highRiskTerms.length
        ? 'review-before-publish'
        : 'safe-to-monitor',
    title:
      blockedSources.length || highRiskTerms.length
        ? 'Partial confirmation: review before publishing'
        : 'Sources healthy: monitor without publishing',
    summary:
      blockedSources.length || highRiskTerms.length
        ? 'At least one trusted source confirmed the tracked active terms, but blocked sources or high-risk terms mean public data should stay conservative until manual review.'
        : 'Tracked source terms look healthy. No automatic public content change is needed unless a manual review finds changed rewards, status labels, or source wording.',
    recommendations,
  };
}

export async function buildGameDataSourceCheckSnapshot(reason = 'manual') {
  const checkedAt = new Date().toISOString();
  const results = await Promise.all(
    SOURCE_CHECK_TARGETS.map((target) => checkTarget(target, checkedAt))
  );
  const attentionCount = results.filter((result) => !result.ok).length;
  const reviewPlan = buildGameDataSourceReviewPlan(results);

  return {
    generatedAt: checkedAt,
    reason,
    sourceCount: results.length,
    healthySources: results.length - attentionCount,
    attentionCount,
    reviewPlan,
    results,
  } satisfies GameDataSourceCheckSnapshot;
}
