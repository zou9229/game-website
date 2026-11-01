import type { GameDataSourceCheckSnapshot } from './game-data-source-check';

const liveCounters = new Set(['Playing', 'Visits', 'Favorites']);

export function aiReviewReuseHours(value?: string) {
  const hours = Number(value);
  return Number.isFinite(hours) && hours >= 1 && hours <= 168 ? hours : 24;
}

export async function gameDataReviewFingerprint(
  snapshot: GameDataSourceCheckSnapshot,
  modelSettings: string[] = []
) {
  // Live player counts and check timestamps change on every run without
  // changing the code-status evidence sent for review.
  const input = {
    version: 1,
    modelSettings,
    state: snapshot.reviewPlan.state,
    results: snapshot.results
      .map((result) => ({
        id: result.id,
        url: result.url,
        kind: result.kind,
        ok: result.ok,
        httpStatus: result.httpStatus,
        error: result.error,
        matchedTerms: [...result.matchedTerms].sort(),
        missingTerms: [...result.missingTerms].sort(),
        highRiskMatches: [...result.highRiskMatches].sort(),
        signals: result.signals.filter(
          (signal) => !liveCounters.has(signal.label)
        ),
      }))
      .sort((a, b) => a.id.localeCompare(b.id)),
  };
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(JSON.stringify(input))
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0')
  ).join('');
}

export function canReuseGameDataAiReview(
  previous: { sourceFingerprint?: string; generatedAt: string } | null,
  fingerprint: string,
  reuseHours: number,
  now = new Date()
) {
  if (!previous || previous.sourceFingerprint !== fingerprint) return false;
  const age = now.getTime() - Date.parse(previous.generatedAt);
  return Number.isFinite(age) && age >= 0 && age < reuseHours * 3_600_000;
}
