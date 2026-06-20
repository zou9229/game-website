import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsUpdates } from '@/data/99-nights-updates';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import { ExternalLink, RefreshCw } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
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
      'Codes are checked after major updates, events, and source changes. Broader guides are refreshed when a reliable source confirms a game change.',
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
  'roblox-page-update': 'Roblox metadata',
};

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
    items: ninetyNineNightsUpdates.entries.map((entry) => ({
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
            Checked {ninetyNineNightsUpdates.checkedAt}
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
        <div className="space-y-4">
          {ninetyNineNightsUpdates.entries.map((entry) => (
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
