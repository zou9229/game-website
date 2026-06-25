'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clipboard,
  Database,
  ExternalLink,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

import { Link } from '@/core/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type FreshnessStatus = 'fresh' | 'due-soon' | 'stale';

type FreshnessItem = {
  title: string;
  href: string;
  kind: string;
  checkedAt: string;
  cadenceDays: number;
  owner: string;
  note: string;
  ageDays: number;
  status: FreshnessStatus;
  priority: 'high' | 'medium' | 'low';
  recommendedAction: string;
};

type FreshnessAction = {
  title: string;
  href: string;
  priority: 'high' | 'medium' | 'low';
  status: FreshnessStatus;
  owner: string;
  action: string;
};

type FreshnessResponse = {
  generatedAt: string;
  roadmap: {
    launchMvpPercent: number;
    operatingSystemPercent: number;
    currentStage: string;
  };
  summary: {
    total: number;
    fresh: number;
    dueSoon: number;
    stale: number;
    automationCandidates: number;
    manualReview: number;
  };
  sourcePolicy: {
    automationCandidate: string;
    manualReview: string;
    futureAiReview: string;
  };
  syncPlan: {
    title: string;
    summary: string;
    steps: {
      label: string;
      detail: string;
    }[];
    automationCandidates: string[];
    manualReviewCount: number;
  };
  actions: FreshnessAction[];
  items: FreshnessItem[];
  nextStep: string;
};

type SourceCheckResult = {
  id: string;
  title: string;
  kind: string;
  sourceName: string;
  url: string;
  checkedAt: string;
  ok: boolean;
  httpStatus?: number;
  contentType?: string;
  matchedTerms: string[];
  missingTerms: string[];
  highRiskMatches: string[];
  signals: {
    label: string;
    value: string;
  }[];
  action: string;
  error?: string;
};

type SourceCheckSnapshot = {
  generatedAt: string;
  reason: string;
  sourceCount: number;
  healthySources: number;
  attentionCount: number;
  reviewPlan?: {
    state: 'safe-to-monitor' | 'review-before-publish' | 'blocked';
    title: string;
    summary: string;
    recommendations: {
      priority: 'high' | 'medium' | 'low';
      label: string;
      detail: string;
    }[];
  };
  results: SourceCheckResult[];
};

type AiReviewItem = {
  label: string;
  detail: string;
  risk: 'low' | 'medium' | 'high';
};

type AiReviewSnapshot = {
  generatedAt: string;
  reason: string;
  provider: 'vertex';
  model: string;
  sourceCheckGeneratedAt?: string;
  decision: 'safe-to-monitor' | 'review-before-publish' | 'blocked';
  confidence: 'low' | 'medium' | 'high';
  summary: string;
  safeUpdates: AiReviewItem[];
  blockedUpdates: AiReviewItem[];
  humanReviewNeeded: AiReviewItem[];
  publishGuardrails: string[];
  operatorNextStep: string;
  rawText?: string;
};

const statusTone = {
  fresh: 'default',
  'due-soon': 'secondary',
  stale: 'destructive',
} as const;

const priorityTone = {
  high: 'destructive',
  medium: 'secondary',
  low: 'outline',
} as const;

const reviewStateTone = {
  'safe-to-monitor': 'default',
  'review-before-publish': 'secondary',
  blocked: 'destructive',
} as const;

const aiDecisionTone = reviewStateTone;

function normalizeSourceCheckResult(
  result: SourceCheckResult
): SourceCheckResult {
  return {
    ...result,
    matchedTerms: Array.isArray(result.matchedTerms) ? result.matchedTerms : [],
    missingTerms: Array.isArray(result.missingTerms) ? result.missingTerms : [],
    highRiskMatches: Array.isArray(result.highRiskMatches)
      ? result.highRiskMatches
      : [],
    signals: Array.isArray(result.signals) ? result.signals : [],
  };
}

function normalizeSourceCheckSnapshot(
  snapshot: SourceCheckSnapshot | null | undefined
): SourceCheckSnapshot | null {
  if (!snapshot) return null;

  const results = Array.isArray(snapshot.results)
    ? snapshot.results.map(normalizeSourceCheckResult)
    : [];
  const healthySources = results.filter((item) => item.ok).length;
  const attentionCount = results.length - healthySources;

  return {
    ...snapshot,
    sourceCount:
      typeof snapshot.sourceCount === 'number'
        ? snapshot.sourceCount
        : results.length,
    healthySources:
      typeof snapshot.healthySources === 'number'
        ? snapshot.healthySources
        : healthySources,
    attentionCount:
      typeof snapshot.attentionCount === 'number'
        ? snapshot.attentionCount
        : attentionCount,
    reviewPlan: snapshot.reviewPlan
      ? {
          ...snapshot.reviewPlan,
          recommendations: Array.isArray(snapshot.reviewPlan.recommendations)
            ? snapshot.reviewPlan.recommendations
            : [],
        }
      : undefined,
    results,
  };
}

function normalizeAiReviewItem(item: AiReviewItem): AiReviewItem {
  return {
    label: String(item?.label || ''),
    detail: String(item?.detail || ''),
    risk:
      item?.risk === 'high' || item?.risk === 'medium' || item?.risk === 'low'
        ? item.risk
        : 'medium',
  };
}

function normalizeAiReviewSnapshot(
  snapshot: AiReviewSnapshot | null | undefined
): AiReviewSnapshot | null {
  if (!snapshot) return null;

  return {
    ...snapshot,
    safeUpdates: Array.isArray(snapshot.safeUpdates)
      ? snapshot.safeUpdates.map(normalizeAiReviewItem)
      : [],
    blockedUpdates: Array.isArray(snapshot.blockedUpdates)
      ? snapshot.blockedUpdates.map(normalizeAiReviewItem)
      : [],
    humanReviewNeeded: Array.isArray(snapshot.humanReviewNeeded)
      ? snapshot.humanReviewNeeded.map(normalizeAiReviewItem)
      : [],
    publishGuardrails: Array.isArray(snapshot.publishGuardrails)
      ? snapshot.publishGuardrails
      : [],
  };
}

export default function AdminGameDataPage() {
  const [data, setData] = useState<FreshnessResponse | null>(null);
  const [sourceCheck, setSourceCheck] = useState<SourceCheckSnapshot | null>(
    null
  );
  const [aiReview, setAiReview] = useState<AiReviewSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [checkingSources, setCheckingSources] = useState(false);
  const [reviewingWithAi, setReviewingWithAi] = useState(false);

  async function loadFreshness({ showToast = false } = {}) {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin/game-data/freshness', {
        cache: 'no-store',
      });
      const json = await res.json();
      if (json.code !== 0) throw new Error(json.message || 'Audit failed');
      setData(json.data);
      if (showToast) toast.success('Freshness audit refreshed');
    } catch (error: any) {
      toast.error(error.message || 'Failed to refresh audit');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function loadSourceCheck() {
    try {
      const res = await fetch('/api/admin/game-data/source-check', {
        cache: 'no-store',
      });
      const json = await res.json();
      if (json.code !== 0)
        throw new Error(json.message || 'Source check failed');
      setSourceCheck(normalizeSourceCheckSnapshot(json.data));
    } catch (error: any) {
      toast.error(error.message || 'Failed to load source check');
    }
  }

  async function runSourceCheck() {
    setCheckingSources(true);
    try {
      const res = await fetch('/api/admin/game-data/source-check', {
        cache: 'no-store',
        method: 'POST',
      });
      const json = await res.json();
      if (json.code !== 0)
        throw new Error(json.message || 'Source check failed');
      setSourceCheck(normalizeSourceCheckSnapshot(json.data));
      toast.success('Source check completed');
    } catch (error: any) {
      toast.error(error.message || 'Failed to run source check');
    } finally {
      setCheckingSources(false);
    }
  }

  async function loadAiReview() {
    try {
      const res = await fetch('/api/admin/game-data/ai-review', {
        cache: 'no-store',
      });
      const json = await res.json();
      if (json.code !== 0)
        throw new Error(json.message || 'AI review load failed');
      setAiReview(normalizeAiReviewSnapshot(json.data));
    } catch (error: any) {
      toast.error(error.message || 'Failed to load AI review');
    }
  }

  async function runAiReview() {
    setReviewingWithAi(true);
    try {
      const res = await fetch('/api/admin/game-data/ai-review', {
        cache: 'no-store',
        method: 'POST',
      });
      const json = await res.json();
      if (json.code !== 0)
        throw new Error(json.message || 'Vertex AI review failed');
      setAiReview(normalizeAiReviewSnapshot(json.data));
      toast.success('Vertex AI review completed');
    } catch (error: any) {
      toast.error(error.message || 'Failed to run Vertex AI review');
    } finally {
      setReviewingWithAi(false);
    }
  }

  async function copyMaintenancePrompt() {
    const prompt = [
      'Quest Codes maintenance request',
      '',
      'Use the questcodes-99nights-keyword-to-page skill.',
      'Goal: review the current game-data audit and source-check results, then update only source-confirmed Roblox code/update data. Do not publish invented guide facts, drop rates, or tier claims.',
      '',
      data
        ? `Audit: ${data.summary.fresh} fresh, ${data.summary.dueSoon} due soon, ${data.summary.stale} stale. Next step: ${data.nextStep}`
        : 'Audit: not loaded.',
      sourceCheck
        ? `Source check: ${sourceCheck.healthySources}/${sourceCheck.sourceCount} sources healthy, ${sourceCheck.attentionCount} need review.`
        : 'Source check: not run yet.',
      sourceCheck?.reviewPlan
        ? `Decision: ${sourceCheck.reviewPlan.title}. ${sourceCheck.reviewPlan.summary}`
        : 'Decision: no source-check decision available yet.',
      aiReview
        ? `Vertex AI review: ${aiReview.decision}, confidence ${aiReview.confidence}. ${aiReview.summary}`
        : 'Vertex AI review: not run yet.',
      '',
      'If sources disagree, keep the current page conservative and show the disagreement instead of forcing an automatic update.',
    ].join('\n');

    await navigator.clipboard.writeText(prompt);
    toast.success('Maintenance prompt copied');
  }

  useEffect(() => {
    loadFreshness();
    loadSourceCheck();
    loadAiReview();
  }, []);

  const sortedItems = useMemo(() => {
    const rank = { stale: 0, 'due-soon': 1, fresh: 2 };
    return [...(data?.items || [])].sort((a, b) => {
      const statusDiff = rank[a.status] - rank[b.status];
      if (statusDiff !== 0) return statusDiff;
      return b.ageDays - a.ageDays;
    });
  }, [data]);
  const sourceResults = sourceCheck?.results ?? [];
  const attentionResults = sourceResults.filter((item) => !item.ok);
  const reviewRecommendations = sourceCheck?.reviewPlan?.recommendations ?? [];
  const nextReviewItem = sortedItems.find(
    (item) => item.status === 'stale' || item.status === 'due-soon'
  );
  const nextOperatorAction = (() => {
    if (!data) {
      return {
        title: 'Load the audit first',
        detail:
          'Run audit loads the checked-date ledger. It is the first step before any source check or publish decision.',
        step: 'Run audit',
      };
    }

    if (nextReviewItem && !sourceCheck) {
      return {
        title: `${nextReviewItem.title} needs a source check`,
        detail:
          'The audit found a page that is due soon or stale. Run source check before asking Codex to change live data.',
        step: 'Run source check',
      };
    }

    if (sourceCheck?.reviewPlan?.state === 'review-before-publish') {
      return {
        title: 'Review before publishing',
        detail:
          'Trusted sources confirmed some terms, but a blocked source or status-label conflict remains. Use Copy Codex prompt so Codex can update only source-confirmed data and keep conflicts visible.',
        step: 'Copy Codex prompt',
      };
    }

    if (sourceCheck?.reviewPlan?.state === 'blocked') {
      return {
        title: 'Manual browser review required',
        detail:
          'No trusted source confirmed enough data for publishing. Open the blocked sources manually before changing any codes, rewards, or stats.',
        step: 'Open source links',
      };
    }

    if (nextReviewItem) {
      return {
        title: `${nextReviewItem.title} is next in the queue`,
        detail:
          'The freshness audit still has a due or stale page. Source-check it, then let Codex publish only verified changes.',
        step: 'Run source check',
      };
    }

    return {
      title: 'No publish action required',
      detail:
        'All tracked pages are fresh. Continue monitoring GSC/Semrush and only build a new page when a distinct keyword intent is validated.',
      step: 'Monitor keywords',
    };
  })();

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Database className="text-primary size-5" />
            <h1 className="text-2xl font-bold">Game Data Freshness</h1>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Read-only audit for Quest Codes game data. It shows which Roblox
            pages are fresh, due soon, or stale before a manual source check or
            scheduled data job changes live content.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => loadFreshness({ showToast: true })}
            disabled={refreshing}
          >
            <RefreshCw
              className={`mr-2 size-4 ${refreshing ? 'animate-spin' : ''}`}
            />
            Run audit
          </Button>
          <Button
            onClick={runSourceCheck}
            disabled={checkingSources}
            variant="secondary"
          >
            <Search
              className={`mr-2 size-4 ${checkingSources ? 'animate-pulse' : ''}`}
            />
            Run source check
          </Button>
          <Button
            onClick={runAiReview}
            disabled={reviewingWithAi || !sourceCheck}
            variant="outline"
          >
            <Sparkles
              className={`mr-2 size-4 ${reviewingWithAi ? 'animate-pulse' : ''}`}
            />
            Run AI review
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[
          ['Total', data?.summary.total ?? 0],
          ['Fresh', data?.summary.fresh ?? 0],
          ['Due soon', data?.summary.dueSoon ?? 0],
          ['Stale', data?.summary.stale ?? 0],
          ['Automation candidates', data?.summary.automationCandidates ?? 0],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <CardDescription>{label}</CardDescription>
              <CardTitle>{value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge>{nextOperatorAction.step}</Badge>
                <CardTitle>What should I do now?</CardTitle>
              </div>
              <CardDescription className="max-w-4xl">
                {nextOperatorAction.detail}
              </CardDescription>
            </div>
            <Button
              onClick={copyMaintenancePrompt}
              disabled={!data}
              variant="outline"
            >
              <Clipboard className="mr-2 size-4" />
              Copy Codex prompt
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            {[
              {
                label: '1. Audit',
                detail:
                  'Checks the local freshness ledger only. It tells you what is stale or due, but it never changes pages.',
              },
              {
                label: '2. Source check',
                detail:
                  'Fetches trusted code and metadata sources. This creates review signals, not an automatic publish.',
              },
              {
                label: '3. Codex review',
                detail:
                  'Use the copied prompt so Codex updates only confirmed source dates, code statuses, or update notes.',
              },
              {
                label: '4. Build and deploy',
                detail:
                  'Codex runs audit and build, commits, pushes, then deploys to Cloudflare only after confirmation.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-background rounded-md border p-4"
              >
                <h3 className="text-sm font-semibold">{item.label}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground bg-background mt-4 rounded-md border p-3 text-sm leading-6">
            Automation status: review-assisted automation is working. Full
            auto-publish is intentionally not enabled yet because wrong Roblox
            codes, rewards, stats, or tier claims would damage trust. The next
            safe upgrade is a scheduled read-only audit/report, not blind
            publishing.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
            <div>
              <CardTitle>Operations control</CardTitle>
              <CardDescription>
                Run a read-only freshness audit first, then source-check trusted
                external pages before changing live content.
              </CardDescription>
            </div>
            <Button
              onClick={copyMaintenancePrompt}
              disabled={!data}
              variant="outline"
            >
              <Clipboard className="mr-2 size-4" />
              Copy Codex prompt
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-md border p-4">
              <div className="flex items-center gap-2">
                <RefreshCw className="text-primary size-4" />
                <h3 className="text-sm font-semibold">Audit state</h3>
              </div>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Calculates fresh, due-soon, and stale status from the tracked
                checked dates. It does not call external sites.
              </p>
            </div>
            <div className="rounded-md border p-4">
              <div className="flex items-center gap-2">
                <Search className="text-primary size-4" />
                <h3 className="text-sm font-semibold">Source check</h3>
              </div>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Fetches trusted code and metadata sources, records matched or
                missing terms, and stores the snapshot in D1.
              </p>
            </div>
            <div className="rounded-md border p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-primary size-4" />
                <h3 className="text-sm font-semibold">Publish rule</h3>
              </div>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Source checks create review signals only. They never rewrite
                guide pages, commit code, or deploy automatically.
              </p>
            </div>
          </div>

          <div className="rounded-md border p-4">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
              <div>
                <h3 className="text-sm font-semibold">Latest source check</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {sourceCheck
                    ? `${sourceCheck.healthySources}/${sourceCheck.sourceCount} sources healthy, ${sourceCheck.attentionCount} need review.`
                    : 'No source check snapshot yet. Run source check to create one.'}
                </p>
                {sourceCheck ? (
                  <p className="text-muted-foreground mt-1 text-xs">
                    Last run:{' '}
                    {new Date(sourceCheck.generatedAt).toLocaleString()}
                  </p>
                ) : null}
              </div>
              <Badge
                variant={
                  sourceCheck?.attentionCount ? 'destructive' : 'default'
                }
              >
                {sourceCheck
                  ? sourceCheck.attentionCount
                    ? 'review needed'
                    : 'healthy'
                  : 'not run'}
              </Badge>
            </div>

            {sourceCheck ? (
              <>
                {sourceCheck.reviewPlan ? (
                  <div className="bg-muted/30 mt-4 rounded-md border p-4">
                    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant={
                              reviewStateTone[sourceCheck.reviewPlan.state]
                            }
                          >
                            {sourceCheck.reviewPlan.state}
                          </Badge>
                          <h3 className="text-sm font-semibold">
                            {sourceCheck.reviewPlan.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {sourceCheck.reviewPlan.summary}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {reviewRecommendations.map((recommendation) => (
                        <div
                          key={`${recommendation.priority}-${recommendation.label}`}
                          className="bg-background rounded-md border p-3"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant={priorityTone[recommendation.priority]}
                            >
                              {recommendation.priority}
                            </Badge>
                            <h4 className="text-sm font-medium">
                              {recommendation.label}
                            </h4>
                          </div>
                          <p className="text-muted-foreground mt-2 text-sm leading-6">
                            {recommendation.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  {sourceResults.map((result) => (
                    <div key={result.id} className="rounded-md border p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={result.ok ? 'default' : 'destructive'}>
                          {result.ok ? 'ok' : 'review'}
                        </Badge>
                        <Badge variant="outline">{result.kind}</Badge>
                        {result.httpStatus ? (
                          <Badge variant="outline">
                            HTTP {result.httpStatus}
                          </Badge>
                        ) : null}
                        <span className="text-sm font-medium">
                          {result.sourceName}
                        </span>
                      </div>
                      <div className="mt-3 space-y-2 text-sm">
                        <p className="text-muted-foreground leading-6">
                          {result.action}
                        </p>
                        {result.matchedTerms.length ? (
                          <p>
                            <span className="text-muted-foreground">
                              Matched:{' '}
                            </span>
                            {result.matchedTerms.join(', ')}
                          </p>
                        ) : null}
                        {result.missingTerms.length ? (
                          <p>
                            <span className="text-muted-foreground">
                              Missing:{' '}
                            </span>
                            {result.missingTerms.join(', ')}
                          </p>
                        ) : null}
                        {result.highRiskMatches.length ? (
                          <p>
                            <span className="text-muted-foreground">
                              Needs label review:{' '}
                            </span>
                            {result.highRiskMatches.join(', ')}
                          </p>
                        ) : null}
                        {result.signals.slice(0, 3).map((signal) => (
                          <p key={signal.label} className="text-xs">
                            <span className="text-muted-foreground">
                              {signal.label}:{' '}
                            </span>
                            {signal.value}
                          </p>
                        ))}
                        {result.error ? (
                          <p className="text-destructive text-xs">
                            {result.error}
                          </p>
                        ) : null}
                      </div>
                      <a
                        className="text-primary mt-3 inline-flex items-center gap-1 text-xs"
                        href={result.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Open source
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {attentionResults.length ? (
              <div className="bg-destructive/10 text-destructive border-destructive/20 mt-4 rounded-md border p-3 text-sm">
                {attentionResults.length} source result
                {attentionResults.length === 1 ? '' : 's'} need manual review
                before any public data change.
              </div>
            ) : sourceCheck ? (
              <div className="mt-4 flex items-center gap-2 rounded-md border p-3 text-sm">
                <CheckCircle2 className="text-primary size-4" />
                Source terms look healthy. Keep monitoring GSC queries before
                expanding more pages.
              </div>
            ) : null}

            <div className="mt-4 rounded-md border p-4">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Sparkles className="text-primary size-4" />
                    <h3 className="text-sm font-semibold">
                      Vertex AI review assistant
                    </h3>
                    {aiReview ? (
                      <>
                        <Badge variant={aiDecisionTone[aiReview.decision]}>
                          {aiReview.decision}
                        </Badge>
                        <Badge variant="outline">
                          confidence {aiReview.confidence}
                        </Badge>
                      </>
                    ) : null}
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {aiReview
                      ? aiReview.summary
                      : 'Run AI review after source check. Vertex AI will summarize safe updates, blocked updates, and manual-review items without publishing anything.'}
                  </p>
                  {aiReview ? (
                    <p className="text-muted-foreground mt-1 text-xs">
                      Model: {aiReview.model}. Last run:{' '}
                      {new Date(aiReview.generatedAt).toLocaleString()}
                    </p>
                  ) : null}
                </div>
                <Button
                  onClick={runAiReview}
                  disabled={reviewingWithAi || !sourceCheck}
                  variant="outline"
                >
                  <Sparkles
                    className={`mr-2 size-4 ${reviewingWithAi ? 'animate-pulse' : ''}`}
                  />
                  Run AI review
                </Button>
              </div>

              {aiReview ? (
                <div className="mt-4 space-y-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      {
                        title: 'Safe updates',
                        items: aiReview.safeUpdates,
                        empty: 'No safe automatic update suggested.',
                      },
                      {
                        title: 'Blocked updates',
                        items: aiReview.blockedUpdates,
                        empty: 'No blocked update listed.',
                      },
                      {
                        title: 'Human review',
                        items: aiReview.humanReviewNeeded,
                        empty: 'No manual-review item listed.',
                      },
                    ].map((section) => (
                      <div
                        key={section.title}
                        className="bg-background rounded-md border p-3"
                      >
                        <h4 className="text-sm font-medium">{section.title}</h4>
                        <div className="mt-3 space-y-3">
                          {section.items.length ? (
                            section.items.map((item) => (
                              <div key={`${section.title}-${item.label}`}>
                                <div className="flex flex-wrap items-center gap-2">
                                  <Badge variant={priorityTone[item.risk]}>
                                    {item.risk}
                                  </Badge>
                                  <span className="text-sm font-medium">
                                    {item.label}
                                  </span>
                                </div>
                                <p className="text-muted-foreground mt-1 text-sm leading-6">
                                  {item.detail}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p className="text-muted-foreground text-sm leading-6">
                              {section.empty}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {aiReview.publishGuardrails.length ? (
                    <div className="bg-muted/30 rounded-md border p-3">
                      <h4 className="text-sm font-medium">
                        Publish guardrails
                      </h4>
                      <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                        {aiReview.publishGuardrails.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {aiReview.operatorNextStep ? (
                    <div className="border-primary/30 bg-primary/5 rounded-md border p-3 text-sm leading-6">
                      <span className="font-medium">Next step: </span>
                      {aiReview.operatorNextStep}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{data?.syncPlan.title ?? 'Safe sync workflow'}</CardTitle>
          <CardDescription>
            {data?.syncPlan.summary ??
              'Detect stale data first, verify sources, then publish only checked changes.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 md:grid-cols-4">
            {(
              data?.syncPlan.steps ?? [
                {
                  label: 'Detect',
                  detail:
                    'Run the audit and watch source pages before changing content.',
                },
                {
                  label: 'Check',
                  detail:
                    'Confirm code and update data against trusted sources.',
                },
                {
                  label: 'Review',
                  detail:
                    'Keep guide and tier-list claims under manual review.',
                },
                {
                  label: 'Publish',
                  detail:
                    'Run audit and build before deploying verified changes.',
                },
              ]
            ).map((step) => (
              <div key={step.label} className="rounded-md border p-4">
                <Badge variant="outline">{step.label}</Badge>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <div className="rounded-md border p-4">
              <h3 className="text-sm font-semibold">
                First automation candidates
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {(
                  data?.syncPlan.automationCandidates ?? [
                    'Codes',
                    'Updates',
                    'Roblox game metadata',
                  ]
                ).map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
            <div className="rounded-md border p-4">
              <h3 className="text-sm font-semibold">Manual-review pages</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {data?.syncPlan.manualReviewCount ?? 16} pages stay protected
                from blind auto-publishing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Progress view</CardTitle>
            <CardDescription>
              Two different completion baselines.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Launch MVP</span>
                <span className="font-medium">
                  {data?.roadmap.launchMvpPercent ?? 86}%
                </span>
              </div>
              <div className="bg-muted mt-2 h-2 rounded-full">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${data?.roadmap.launchMvpPercent ?? 86}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Operating system</span>
                <span className="font-medium">
                  {data?.roadmap.operatingSystemPercent ?? 49}%
                </span>
              </div>
              <div className="bg-muted mt-2 h-2 rounded-full">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${data?.roadmap.operatingSystemPercent ?? 49}%`,
                  }}
                />
              </div>
            </div>
            <p className="text-muted-foreground leading-6">
              {data?.roadmap.currentStage ??
                'Public SEO MVP is live with guide-site navigation. The operating system still needs deeper keyword coverage, source checks, and safer automation.'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next update queue</CardTitle>
            <CardDescription>
              Read-only recommendations. They do not mutate data or deploy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <p className="text-muted-foreground text-sm">Loading queue...</p>
            ) : data?.actions.length ? (
              data.actions.slice(0, 6).map((action) => (
                <div key={action.href} className="rounded-md border p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={priorityTone[action.priority]}>
                      {action.priority}
                    </Badge>
                    <Badge variant={statusTone[action.status]}>
                      {action.status}
                    </Badge>
                    <Badge variant="outline">{action.owner}</Badge>
                  </div>
                  <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-muted-foreground mt-1 text-sm leading-6">
                        {action.action}
                      </p>
                    </div>
                    <Link
                      href={action.href}
                      target="_blank"
                      className="text-primary inline-flex shrink-0 items-center gap-1 text-sm"
                    >
                      Open
                      <ExternalLink className="size-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                No queued data action. Continue keyword expansion and source
                monitoring.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance policy</CardTitle>
          <CardDescription>
            Run audit is read-only. Run source check records external source
            signals, but still does not edit data files, create commits, or
            deploy.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2 text-sm">
          <p>
            {data?.sourcePolicy.automationCandidate ??
              'Codes, update checks, and Roblox metadata can become automation candidates first.'}
          </p>
          <p>
            {data?.sourcePolicy.manualReview ??
              'Guide and tier-list pages stay manual-review because wrong game data is worse than stale data.'}
          </p>
          <p>
            {data?.sourcePolicy.futureAiReview ??
              'Future community submissions can use AI review first, with uncertain claims routed to human review.'}
          </p>
          {data ? (
            <p>
              Last audit generated at{' '}
              <span className="text-foreground font-medium">
                {new Date(data.generatedAt).toLocaleString()}
              </span>
              .
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tracked pages</CardTitle>
          <CardDescription>
            Sorted by stale risk, then by oldest checked date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-sm">Loading audit...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3 pr-4 font-medium">Status</th>
                    <th className="py-3 pr-4 font-medium">Priority</th>
                    <th className="py-3 pr-4 font-medium">Page</th>
                    <th className="py-3 pr-4 font-medium">Kind</th>
                    <th className="py-3 pr-4 font-medium">Checked</th>
                    <th className="py-3 pr-4 font-medium">Age</th>
                    <th className="py-3 pr-4 font-medium">Cadence</th>
                    <th className="py-3 pr-4 font-medium">Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedItems.map((item) => (
                    <tr key={item.href} className="border-b align-top">
                      <td className="py-3 pr-4">
                        <Badge variant={statusTone[item.status]}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4">
                        <Badge variant={priorityTone[item.priority]}>
                          {item.priority}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="font-medium">{item.title}</div>
                        <p className="text-muted-foreground mt-1 max-w-md text-xs leading-5">
                          {item.note}
                        </p>
                        <p className="text-muted-foreground mt-1 max-w-md text-xs leading-5">
                          {item.recommendedAction}
                        </p>
                        <Link
                          href={item.href}
                          target="_blank"
                          className="text-primary mt-2 inline-flex items-center gap-1 text-xs"
                        >
                          Open page
                          <ExternalLink className="size-3" />
                        </Link>
                      </td>
                      <td className="py-3 pr-4">{item.kind}</td>
                      <td className="py-3 pr-4">{item.checkedAt}</td>
                      <td className="py-3 pr-4">{item.ageDays}d</td>
                      <td className="py-3 pr-4">{item.cadenceDays}d</td>
                      <td className="py-3 pr-4">{item.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
