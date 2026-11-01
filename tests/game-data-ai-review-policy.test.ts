import assert from 'node:assert/strict';
import test from 'node:test';

import {
  aiReviewReuseHours,
  canReuseGameDataAiReview,
  gameDataReviewFingerprint,
} from '../src/lib/game-data-ai-review-policy';
import type { GameDataSourceCheckSnapshot } from '../src/lib/game-data-source-check';

function snapshot(): GameDataSourceCheckSnapshot {
  return {
    generatedAt: '2026-11-01T01:00:00Z',
    reason: 'cloudflare-cron',
    sourceCount: 1,
    healthySources: 1,
    attentionCount: 0,
    reviewPlan: {
      state: 'review-before-publish',
      title: 'Review',
      summary: 'Review source status.',
      recommendations: [],
    },
    results: [
      {
        id: 'test-source',
        title: 'Codes',
        kind: 'codes',
        sourceName: 'Test source',
        url: 'https://example.invalid/codes',
        checkedAt: '2026-11-01T01:00:00Z',
        ok: true,
        httpStatus: 200,
        matchedTerms: ['first', 'second'],
        missingTerms: [],
        highRiskMatches: ['expired'],
        action: 'Review',
        signals: [
          { label: 'Playing', value: '100' },
          { label: 'Updated', value: '2026-10-31T00:00:00Z' },
        ],
      },
    ],
  };
}

test('a fresh review can be reused despite a newer check time and live player count', async () => {
  const earlier = snapshot();
  const later = structuredClone(earlier);
  later.generatedAt = '2026-11-01T13:00:00Z';
  later.results[0].checkedAt = later.generatedAt;
  later.results[0].signals[0].value = '999';
  later.results[0].matchedTerms.reverse();
  const fingerprint = await gameDataReviewFingerprint(earlier);
  assert.equal(await gameDataReviewFingerprint(later), fingerprint);
  assert.equal(
    canReuseGameDataAiReview(
      { sourceFingerprint: fingerprint, generatedAt: earlier.generatedAt },
      fingerprint,
      24,
      new Date(later.generatedAt)
    ),
    true
  );
});

test('source failures, changed code evidence and game updates require a new review', async () => {
  const base = snapshot();
  const expected = await gameDataReviewFingerprint(base);
  for (const change of [
    (s: GameDataSourceCheckSnapshot) => {
      s.results[0].ok = false;
      s.results[0].httpStatus = 403;
    },
    (s: GameDataSourceCheckSnapshot) => {
      s.results[0].matchedTerms.push('new-code');
    },
    (s: GameDataSourceCheckSnapshot) => {
      s.results[0].highRiskMatches = [];
    },
    (s: GameDataSourceCheckSnapshot) => {
      s.results[0].signals[1].value = '2026-11-01T00:00:00Z';
    },
    (s: GameDataSourceCheckSnapshot) => {
      s.reviewPlan.state = 'blocked';
    },
  ]) {
    const changed = structuredClone(base);
    change(changed);
    const fingerprint = await gameDataReviewFingerprint(changed);
    assert.notEqual(fingerprint, expected);
    assert.equal(
      canReuseGameDataAiReview(
        { sourceFingerprint: expected, generatedAt: base.generatedAt },
        fingerprint,
        24,
        new Date('2026-11-01T02:00:00Z')
      ),
      false
    );
  }
});

test('changed review model invalidates reuse', async () => {
  assert.notEqual(
    await gameDataReviewFingerprint(snapshot(), [
      'project',
      'global',
      'model-a',
    ]),
    await gameDataReviewFingerprint(snapshot(), [
      'project',
      'global',
      'model-b',
    ])
  );
});

test('reuse expires at the configured boundary and rejects legacy or invalid review dates', () => {
  const previous = {
    sourceFingerprint: 'same',
    generatedAt: '2026-11-01T01:00:00Z',
  };
  assert.equal(
    canReuseGameDataAiReview(
      previous,
      'same',
      24,
      new Date('2026-11-02T00:59:59Z')
    ),
    true
  );
  assert.equal(
    canReuseGameDataAiReview(
      previous,
      'same',
      24,
      new Date('2026-11-02T01:00:00Z')
    ),
    false
  );
  assert.equal(
    canReuseGameDataAiReview({ generatedAt: previous.generatedAt }, 'same', 24),
    false
  );
  assert.equal(
    canReuseGameDataAiReview(
      { ...previous, generatedAt: 'invalid' },
      'same',
      24
    ),
    false
  );
  assert.equal(
    canReuseGameDataAiReview(
      previous,
      'same',
      24,
      new Date('2026-10-31T00:00:00Z')
    ),
    false
  );
});

test('reuse configuration has a bounded default', () => {
  assert.equal(aiReviewReuseHours('48'), 48);
  assert.equal(aiReviewReuseHours('1'), 1);
  assert.equal(aiReviewReuseHours('168'), 168);
  for (const value of [undefined, '', '0', '-2', '169', 'bad', 'Infinity'])
    assert.equal(aiReviewReuseHours(value), 24);
});
