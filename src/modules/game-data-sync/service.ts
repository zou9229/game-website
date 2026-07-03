import { eq } from 'drizzle-orm';

import { generateTextWithVertexGemini } from '@/core/ai/vertex-gemini';
import { db } from '@/core/db';
import { config } from '@/config/db/schema';
import {
  buildGameDataSourceCheckSnapshot,
  buildGameDataSourceReviewPlan,
  type GameDataSourceCheckSnapshot,
} from '@/lib/game-data-source-check';

import {
  sendGameDataOperatorAlert,
  type GameDataOperatorAlertNotification,
} from './operator-alerts';

const SNAPSHOT_KEY = 'questcodes.gameData.sourceCheck.snapshot';
const STATUS_KEY = 'questcodes.gameData.sourceCheck.status';
const AI_REVIEW_KEY = 'questcodes.gameData.aiReview.snapshot';

export type GameDataAiReviewDecision =
  | 'safe-to-monitor'
  | 'review-before-publish'
  | 'blocked';

export type GameDataAiReviewItem = {
  label: string;
  detail: string;
  risk: 'low' | 'medium' | 'high';
};

export type GameDataAiReviewSnapshot = {
  generatedAt: string;
  reason: string;
  provider: 'vertex';
  model: string;
  sourceCheckGeneratedAt?: string;
  decision: GameDataAiReviewDecision;
  confidence: 'low' | 'medium' | 'high';
  summary: string;
  safeUpdates: GameDataAiReviewItem[];
  blockedUpdates: GameDataAiReviewItem[];
  humanReviewNeeded: GameDataAiReviewItem[];
  publishGuardrails: string[];
  operatorNextStep: string;
  rawText?: string;
};

type VertexReviewConfigs = Record<string, string>;

type RunGameDataSourceCheckOptions = {
  notifyOperator?: boolean;
};

export type GameDataSourceCheckRunResult = GameDataSourceCheckSnapshot & {
  notification?: GameDataOperatorAlertNotification;
};

async function readConfigValue(name: string) {
  const [row] = await db()
    .select()
    .from(config)
    .where(eq(config.name, name))
    .limit(1);
  return row?.value ?? undefined;
}

async function writeConfigValue(name: string, value: string) {
  await db().transaction(async (tx: any) => {
    const [existing] = await tx
      .select()
      .from(config)
      .where(eq(config.name, name))
      .limit(1);

    if (existing) {
      await tx.update(config).set({ value }).where(eq(config.name, name));
    } else {
      await tx.insert(config).values({ name, value });
    }
  });
}

export async function runGameDataSourceCheck(
  reason = 'manual',
  options: RunGameDataSourceCheckOptions = {}
): Promise<GameDataSourceCheckRunResult> {
  const snapshot = await buildGameDataSourceCheckSnapshot(reason);

  await writeConfigValue(SNAPSHOT_KEY, JSON.stringify(snapshot));
  await writeConfigValue(
    STATUS_KEY,
    JSON.stringify({
      generatedAt: snapshot.generatedAt,
      reason: snapshot.reason,
      sourceCount: snapshot.sourceCount,
      healthySources: snapshot.healthySources,
      attentionCount: snapshot.attentionCount,
    })
  );

  if (!options.notifyOperator) return snapshot;

  const notification = await sendGameDataOperatorAlert(snapshot);
  return {
    ...snapshot,
    notification,
  };
}

export async function getLatestGameDataSourceCheck() {
  const raw = await readConfigValue(SNAPSHOT_KEY);
  if (!raw) return null;

  try {
    const snapshot = JSON.parse(raw) as GameDataSourceCheckSnapshot;
    const results = Array.isArray(snapshot.results) ? snapshot.results : [];
    const reviewPlan =
      snapshot.reviewPlan ?? buildGameDataSourceReviewPlan(results);

    return {
      ...snapshot,
      results,
      reviewPlan: {
        ...reviewPlan,
        recommendations: Array.isArray(reviewPlan.recommendations)
          ? reviewPlan.recommendations
          : [],
      },
    };
  } catch {
    return null;
  }
}

function parseModelList(value: unknown) {
  return String(value || '')
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getConfigValue(
  configs: VertexReviewConfigs,
  names: string[],
  fallback = ''
) {
  for (const name of names) {
    const value = configs[name] || process.env[name.toUpperCase()];
    if (value) return value;
  }

  return fallback;
}

function getVertexReviewRuntime(configs: VertexReviewConfigs) {
  const model = getConfigValue(
    configs,
    ['vertex_ai_model', 'gemini_vertex_model'],
    process.env.VERTEX_AI_MODEL || ''
  );
  const fallbackModels = parseModelList(
    getConfigValue(
      configs,
      ['vertex_ai_fallback_models', 'gemini_vertex_fallback_models'],
      process.env.VERTEX_AI_FALLBACK_MODELS || ''
    )
  );

  return {
    projectId: getConfigValue(configs, [
      'vertex_ai_project_id',
      'gemini_vertex_project_id',
    ]),
    location: getConfigValue(
      configs,
      ['vertex_ai_location', 'gemini_vertex_location'],
      process.env.VERTEX_AI_LOCATION || ''
    ),
    serviceAccountJson:
      configs.vertex_ai_service_account_json ||
      configs.gemini_vertex_service_account_json ||
      process.env.VERTEX_AI_SERVICE_ACCOUNT_JSON ||
      process.env.GEMINI_VERTEX_SERVICE_ACCOUNT_JSON ||
      '',
    models: Array.from(new Set([model, ...fallbackModels].filter(Boolean))),
  };
}

function cleanAiJsonText(value: string) {
  const trimmed = value
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  return trimmed;
}

function normalizeReviewItems(value: unknown): GameDataAiReviewItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item: any) => ({
      label: String(item?.label || '').slice(0, 120),
      detail: String(item?.detail || item?.why || '').slice(0, 500),
      risk:
        item?.risk === 'high' || item?.risk === 'medium' || item?.risk === 'low'
          ? item.risk
          : 'medium',
    }))
    .filter((item) => item.label && item.detail);
}

function normalizeAiReview(
  parsed: any,
  params: {
    generatedAt: string;
    reason: string;
    model: string;
    sourceCheckGeneratedAt?: string;
    rawText: string;
  }
): GameDataAiReviewSnapshot {
  const decision: GameDataAiReviewDecision =
    parsed?.decision === 'safe-to-monitor' ||
    parsed?.decision === 'review-before-publish' ||
    parsed?.decision === 'blocked'
      ? parsed.decision
      : 'review-before-publish';
  const confidence =
    parsed?.confidence === 'high' ||
    parsed?.confidence === 'medium' ||
    parsed?.confidence === 'low'
      ? parsed.confidence
      : 'low';
  const publishGuardrails = Array.isArray(parsed?.publish_guardrails)
    ? parsed.publish_guardrails
    : Array.isArray(parsed?.publishGuardrails)
      ? parsed.publishGuardrails
      : [];

  return {
    generatedAt: params.generatedAt,
    reason: params.reason,
    provider: 'vertex',
    model: params.model,
    sourceCheckGeneratedAt: params.sourceCheckGeneratedAt,
    decision,
    confidence,
    summary: String(parsed?.summary || '').slice(0, 700),
    safeUpdates: normalizeReviewItems(
      parsed?.safe_updates || parsed?.safeUpdates
    ),
    blockedUpdates: normalizeReviewItems(
      parsed?.blocked_updates || parsed?.blockedUpdates
    ),
    humanReviewNeeded: normalizeReviewItems(
      parsed?.human_review_needed || parsed?.humanReviewNeeded
    ),
    publishGuardrails: publishGuardrails
      .map((item: unknown) => String(item || '').trim())
      .filter(Boolean)
      .slice(0, 8),
    operatorNextStep: String(
      parsed?.operator_next_step || parsed?.operatorNextStep || ''
    ).slice(0, 500),
    rawText: params.rawText.slice(0, 4000),
  };
}

function buildAiReviewPrompt(snapshot: GameDataSourceCheckSnapshot) {
  const compactSnapshot = {
    generatedAt: snapshot.generatedAt,
    reason: snapshot.reason,
    sourceCount: snapshot.sourceCount,
    healthySources: snapshot.healthySources,
    attentionCount: snapshot.attentionCount,
    reviewPlan: snapshot.reviewPlan,
    results: snapshot.results.map((result) => ({
      sourceName: result.sourceName,
      kind: result.kind,
      ok: result.ok,
      httpStatus: result.httpStatus,
      matchedTerms: result.matchedTerms,
      missingTerms: result.missingTerms,
      highRiskMatches: result.highRiskMatches,
      action: result.action,
      signals: result.signals.slice(0, 3),
      error: result.error,
    })),
  };

  return `You are the Quest Codes source-review assistant for a Roblox guide site.

Analyze the source-check snapshot below and return one JSON object only.

Rules:
- Do not invent Roblox codes, rewards, tier claims, drop rates, stats, patch notes, crafting costs, or guide facts.
- Do not recommend automatic publishing when any trusted source is blocked, missing expected terms, or has high-risk matches.
- Only label an update safe if the snapshot itself confirms it from trusted sources.
- If sources disagree, keep the public page conservative and show the disagreement.
- This is a review assistant. It must not instruct the app to commit, deploy, or rewrite live data automatically.

Return this exact JSON shape:
{
  "decision": "safe-to-monitor" | "review-before-publish" | "blocked",
  "confidence": "low" | "medium" | "high",
  "summary": "one short operational summary",
  "safe_updates": [{"label": "...", "detail": "...", "risk": "low" | "medium" | "high"}],
  "blocked_updates": [{"label": "...", "detail": "...", "risk": "low" | "medium" | "high"}],
  "human_review_needed": [{"label": "...", "detail": "...", "risk": "low" | "medium" | "high"}],
  "publish_guardrails": ["..."],
  "operator_next_step": "one concrete next step for the site owner"
}

Source-check snapshot:
${JSON.stringify(compactSnapshot, null, 2)}`;
}

export async function runGameDataAiReview(
  configs: VertexReviewConfigs,
  reason = 'manual'
) {
  const latestSourceCheck = await getLatestGameDataSourceCheck();
  if (!latestSourceCheck) {
    throw new Error('Run source check before AI review.');
  }

  const runtime = getVertexReviewRuntime(configs);
  if (!runtime.serviceAccountJson) {
    throw new Error(
      'Vertex AI service account json is not configured. Set VERTEX_AI_SERVICE_ACCOUNT_JSON as a Cloudflare secret or fill vertex_ai_service_account_json in admin settings.'
    );
  }
  if (!runtime.location) {
    throw new Error(
      'Vertex AI location is not configured. Set Location in Admin Settings -> AI -> Vertex AI.'
    );
  }
  if (runtime.models.length === 0) {
    throw new Error(
      'Vertex AI model is not configured. Set Review Model in Admin Settings -> AI -> Vertex AI.'
    );
  }

  const errors: string[] = [];
  const generatedAt = new Date().toISOString();

  for (const model of runtime.models) {
    try {
      const result = await generateTextWithVertexGemini({
        projectId: runtime.projectId,
        location: runtime.location,
        model,
        serviceAccountJson: runtime.serviceAccountJson,
        prompt: buildAiReviewPrompt(latestSourceCheck),
        generationConfig: {
          temperature: 0.1,
          topP: 0.7,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json',
        },
      });
      const parsed = JSON.parse(cleanAiJsonText(result.text));
      const review = normalizeAiReview(parsed, {
        generatedAt,
        reason,
        model: result.model,
        sourceCheckGeneratedAt: latestSourceCheck.generatedAt,
        rawText: result.text,
      });

      await writeConfigValue(AI_REVIEW_KEY, JSON.stringify(review));
      return review;
    } catch (error: any) {
      errors.push(`${model}: ${error?.message || 'unknown error'}`);
    }
  }

  throw new Error(`Vertex AI review failed. ${errors.join(' | ')}`);
}

export async function getLatestGameDataAiReview() {
  const raw = await readConfigValue(AI_REVIEW_KEY);
  if (!raw) return null;

  try {
    const review = JSON.parse(raw) as GameDataAiReviewSnapshot;
    return {
      ...review,
      safeUpdates: Array.isArray(review.safeUpdates) ? review.safeUpdates : [],
      blockedUpdates: Array.isArray(review.blockedUpdates)
        ? review.blockedUpdates
        : [],
      humanReviewNeeded: Array.isArray(review.humanReviewNeeded)
        ? review.humanReviewNeeded
        : [],
      publishGuardrails: Array.isArray(review.publishGuardrails)
        ? review.publishGuardrails
        : [],
    };
  } catch {
    return null;
  }
}
