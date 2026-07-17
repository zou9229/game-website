import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsUpdates } from '@/data/99-nights-updates';
import { buildGameDataFreshnessAudit } from '@/data/game-data-audit';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import { ExternalLink, RefreshCw } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { getLatestGameDataSourceCheck } from '@/modules/game-data-sync/service';
import { buildFreshnessOverridesFromSourceCheck } from '@/lib/game-data-source-check';
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildItemListSchema,
  buildVideoGameSchema,
  canonicalUrl,
  currentMonthYear,
} from '@/lib/seo';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const game = getRobloxGame('99-nights-in-the-forest');

const faqs = [
  {
    question: 'Is this page official 99 Nights in the Forest patch notes?',
    answer:
      'No. This is a fan-made update and source-check tracker. It records checked public sources and avoids inventing patch details.',
  },
  {
    question: 'How often are 99 Nights in the Forest updates checked?',
    answer:
      'Cloudflare checks code sources and Roblox metadata twice daily. Broader guides are refreshed only when a reliable source confirms a game change.',
  },
  {
    question: 'Why do some entries say metadata only?',
    answer:
      'A Roblox page updated date does not explain what changed. Quest Codes records it as metadata unless a source gives actual patch details.',
  },
  {
    question: 'Where should I go for working codes?',
    answer:
      'Use the 99 Nights in the Forest codes page for active codes, special redemption notes, expired history, and copy buttons.',
  },
  {
    question: 'Can users submit new codes or update tips?',
    answer:
      'Community submissions are planned, but new claims still need source checks before they become published active codes.',
  },
];

const typeLabels = {
  'code-check': 'Code check',
  'guide-data-pass': 'Guide data pass',
  'page-build': 'Page build',
  'roblox-page-update': 'Roblox metadata',
};

const playerFacingEntries = ninetyNineNightsUpdates.entries.filter(
  (entry, index, entries) =>
    entries.findIndex((candidate) => candidate.type === entry.type) === index
);

const freshnessTone = {
  fresh: 'default',
  'due-soon': 'secondary',
  stale: 'destructive',
} as const;

const monitorTone = {
  'safe-to-monitor': 'default',
  'review-before-publish': 'secondary',
  blocked: 'destructive',
  delayed: 'destructive',
} as const;

const sourceMonitorDelayHours = 26;

function getSnapshotAgeHours(value?: string) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return Math.max(0, Math.floor((Date.now() - date.getTime()) / 3_600_000));
}

function formatSnapshotTime(value?: string) {
  if (!value) return 'No scheduled snapshot yet';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Invalid snapshot time';

  return date.toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl(
    '/roblox/99-nights-in-the-forest/updates/',
    locale
  );

  return {
    title: `99 Nights in the Forest Updates (${monthYear}) - Code Checks`,
    description:
      'Track 99 Nights in the Forest updates, code checks, source changes, guide refreshes, and Roblox metadata without invented patch notes.',
    keywords: seoKeywords.ninetyNineNightsUpdates,
    robots: {
      index: false,
      follow: true,
    },
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Updates (${monthYear})`,
      description:
        'Source-checked 99 Nights updates, code checks, and guide refresh notes.',
      url: canonical,
      images: game ? [game.imageUrl] : undefined,
      type: 'article',
    },
  };
}

export default async function UpdatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const latestSourceCheck = await getLatestGameDataSourceCheck().catch(
    () => null
  );
  const sourceMonitorAgeHours = getSnapshotAgeHours(
    latestSourceCheck?.generatedAt
  );
  const sourceMonitorDelayed =
    sourceMonitorAgeHours === null ||
    sourceMonitorAgeHours > sourceMonitorDelayHours;
  const sourceMonitorState = sourceMonitorDelayed
    ? 'delayed'
    : (latestSourceCheck?.reviewPlan.state ?? 'delayed');
  const freshnessOverrides = latestSourceCheck
    ? buildFreshnessOverridesFromSourceCheck(latestSourceCheck)
    : undefined;
  const freshnessAudit = buildGameDataFreshnessAudit(
    new Date(),
    freshnessOverrides
  );

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/updates/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Updates', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const itemListSchema = buildItemListSchema({
    name: '99 Nights in the Forest update checks',
    description:
      'Code checks, guide refreshes, and metadata update notes for 99 Nights in the Forest.',
    items: playerFacingEntries.map((entry) => ({
      name: entry.title,
      url: `${pageUrl}#${entry.date}-${entry.type}`,
      description: entry.summary,
    })),
  });
  const videoGameSchema = buildVideoGameSchema({
    name: game.name,
    description: game.description,
    url: gameUrl,
    imageUrl: game.imageUrl,
    developer: game.developer,
    genre: game.genre,
    dateModified: game.updatedAt,
  });

  return (
    <main className="bg-background min-h-screen">
      {[breadcrumbSchema, faqSchema, itemListSchema, videoGameSchema].map(
        (schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )
      )}

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          <nav className="text-muted-foreground mb-5 flex flex-wrap gap-2 text-sm">
            <Link href="/roblox" className="hover:text-foreground">
              Roblox
            </Link>
            <span>/</span>
            <Link
              href="/roblox/99-nights-in-the-forest"
              className="hover:text-foreground"
            >
              {game.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">Updates</span>
          </nav>

          <Badge variant="outline" className="mb-4 gap-1.5">
            <RefreshCw className="size-3.5" />
            Editorial checked {ninetyNineNightsUpdates.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            99 Nights in the Forest updates and code checks
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            A source-checked tracker for 99 Nights code changes, guide
            refreshes, and Roblox page metadata. This page is careful about
            separating real patch information from simple checked-date changes.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/codes"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            >
              View working codes
            </Link>
            <Link
              href="/roblox/99-nights-in-the-forest/survival-guide"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Survival guide
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Update policy</CardTitle>
            <CardDescription>
              We do not turn vague signals into fake patch notes.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm leading-6">
            <p>
              Codes pages update fastest because code lists change after events,
              milestone rewards, and developer apology drops.
            </p>
            <p>
              Guides update when a source confirms a new class, animal, tool,
              route, or balance change. Roblox metadata alone is logged, but not
              treated as patch detail.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={monitorTone[sourceMonitorState]}>
                {sourceMonitorState}
              </Badge>
              <Badge variant="outline">Cloudflare Cron</Badge>
              <Badge variant="outline">Read-only monitor</Badge>
            </div>
            <CardTitle>Latest automated source monitor</CardTitle>
            <CardDescription>
              This snapshot reports source availability and matching terms. It
              never changes public code status or guide facts by itself.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm sm:grid-cols-3">
            <div className="rounded-md border p-4">
              <span className="text-muted-foreground block">Last run</span>
              <span className="mt-1 block font-medium">
                {formatSnapshotTime(latestSourceCheck?.generatedAt)}
              </span>
              <span className="text-muted-foreground mt-1 block text-xs">
                {sourceMonitorAgeHours === null
                  ? 'Waiting for the first scheduled run.'
                  : `${sourceMonitorAgeHours} hour(s) ago`}
              </span>
            </div>
            <div className="rounded-md border p-4">
              <span className="text-muted-foreground block">Source health</span>
              <span className="mt-1 block font-medium">
                {latestSourceCheck
                  ? `${latestSourceCheck.healthySources}/${latestSourceCheck.sourceCount} healthy`
                  : 'Unavailable'}
              </span>
              <span className="text-muted-foreground mt-1 block text-xs">
                {latestSourceCheck
                  ? `${latestSourceCheck.attentionCount} source(s) need review`
                  : 'No source result is available.'}
              </span>
            </div>
            <div className="rounded-md border p-4">
              <span className="text-muted-foreground block">Decision</span>
              <span className="mt-1 block font-medium">
                {sourceMonitorDelayed
                  ? 'Wait for the next scheduled run'
                  : latestSourceCheck?.reviewPlan.title}
              </span>
              <span className="text-muted-foreground mt-1 block text-xs">
                Public data stays conservative until source disagreements are
                manually reviewed.
              </span>
            </div>
          </CardContent>
        </Card>

        <section className="mb-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Data freshness dashboard
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Automation candidates use the latest successful source-monitor
              date. Manual guide facts keep their separate editorial review date
              and never become fresh from a crawler result alone.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {freshnessAudit.items.map((entry) => (
              <Card key={entry.href}>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={freshnessTone[entry.status]}>
                      {entry.status}
                    </Badge>
                    <Badge variant="outline">{entry.kind}</Badge>
                    <Badge variant="outline">{entry.owner}</Badge>
                  </div>
                  <CardTitle>{entry.title}</CardTitle>
                  <CardDescription>{entry.note}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 text-sm sm:grid-cols-3">
                  <div>
                    <span className="text-muted-foreground block">Checked</span>
                    <span className="font-medium">{entry.checkedAt}</span>
                    <span className="text-muted-foreground mt-1 block text-xs">
                      {entry.freshnessBasis === 'automated-source-monitor'
                        ? `Source monitor; editorial ${entry.editorialCheckedAt}`
                        : 'Editorial review'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Age</span>
                    <span className="font-medium">{entry.ageDays} days</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Cadence</span>
                    <span className="font-medium">
                      {entry.cadenceDays} days
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="space-y-4">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold tracking-tight">
              Latest meaningful checks
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl leading-7">
              This public history keeps the latest entry for each kind of player
              impact. Repeated no-change crawler runs stay in the administrator
              audit log instead of becoming duplicate public articles.
            </p>
          </div>
          {playerFacingEntries.map((entry) => (
            <Card id={`${entry.date}-${entry.type}`} key={entry.title}>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{typeLabels[entry.type]}</Badge>
                  <Badge variant="outline">{entry.date}</Badge>
                </div>
                <CardTitle>{entry.title}</CardTitle>
                <CardDescription>{entry.summary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3 md:grid-cols-3">
                  {entry.details.map((detail) => (
                    <div key={detail} className="rounded-md border p-4">
                      <p className="text-muted-foreground text-sm leading-6">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <h2 className="text-base font-semibold">Sources</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.sources.map((source) => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center gap-1.5 rounded-md border px-3 text-sm font-medium"
                      >
                        {source.name}
                        <ExternalLink className="size-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Related 99 Nights pages</CardTitle>
              <CardDescription>
                Continue from update checks into practical game decisions.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              {game.pages
                .filter((page) => page.status === 'live')
                .map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="hover:bg-accent rounded-md border p-3"
                  >
                    <span className="font-medium">{page.title}</span>
                    <span className="text-muted-foreground mt-1 block">
                      {page.description}
                    </span>
                  </Link>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>
                Short answers about updates, checks, and community claims.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-md border p-4">
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
