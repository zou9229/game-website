import type { Metadata } from 'next';
import { robloxGames } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  ArrowRight,
  CheckCircle2,
  SearchCheck,
  ShieldAlert,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl('/codes/', locale);

  return {
    title: `Roblox Codes Index (${monthYear}) - Quest Codes`,
    description:
      'Browse source-checked Roblox code pages with active rewards, expired history, redemption notes, and related game guides.',
    keywords: seoKeywords.codesIndex,
    robots: {
      index: false,
      follow: true,
    },
    alternates: { canonical },
    openGraph: {
      title: `Roblox Codes Index (${monthYear}) - Quest Codes`,
      description:
        'Source-checked Roblox code pages with active rewards, expired history, and related guides.',
      url: canonical,
      type: 'website',
    },
  };
}

export default async function CodesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const canonical = canonicalUrl('/codes/', locale);
  const codePages = robloxGames.flatMap((game) =>
    game.pages
      .filter((page) => page.status === 'live' && page.title === 'Codes')
      .map((page) => ({ game, page }))
  );
  const totalActive = robloxGames.reduce(
    (sum, game) =>
      sum +
      game.codes.filter(
        (code) => code.status === 'active' || code.status === 'special'
      ).length,
    0
  );
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Codes', item: canonical },
  ]);
  const itemListSchema = buildItemListSchema({
    name: 'Roblox code pages on Quest Codes',
    description:
      'Source-checked Roblox codes pages with rewards, redemption notes, and expired code history.',
    items: codePages.map(({ game, page }) => ({
      name: `${game.name} ${page.title}`,
      url: canonicalUrl(page.href, locale),
      description: page.description,
    })),
  });

  return (
    <>
      <main className="bg-background min-h-screen">
        {[breadcrumbSchema, itemListSchema].map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4">
              Roblox codes index
            </Badge>
            <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
              Roblox codes with source checks
            </h1>
            <p className="text-muted-foreground mt-4 text-lg leading-8">
              Browse Quest Codes pages that track working Roblox codes, special
              redemption notes, expired history, and related game guides. We add
              a game only after there is enough source data to avoid thin or
              copied code lists.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CheckCircle2 className="text-primary size-5" />
                <CardTitle>{codePages.length} code page</CardTitle>
                <CardDescription>
                  Published pages with active, special, and expired code
                  sections.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <SearchCheck className="text-primary size-5" />
                <CardTitle>{totalActive} active or special entries</CardTitle>
                <CardDescription>
                  Entries are separated by source status instead of merged into
                  a single unverified list.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <ShieldAlert className="text-primary size-5" />
                <CardTitle>No fake code claims</CardTitle>
                <CardDescription>
                  Conflicting sources are labeled. Unverified code claims do not
                  become normal active codes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Published code pages
              </h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                The index is intentionally small at launch. The goal is to rank
                with source quality first, then scale to more games.
              </p>
            </div>
            <Link
              href="/roblox"
              className="text-primary text-sm font-medium underline-offset-4 hover:underline"
            >
              Browse Roblox hub
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {codePages.map(({ game, page }) => {
              const activeCodes = game.codes.filter(
                (code) => code.status === 'active' || code.status === 'special'
              );

              return (
                <Card key={page.href} className="overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src={game.imageUrl}
                      alt={`${game.name} Roblox thumbnail`}
                      title={`${game.name} Roblox thumbnail`}
                      className="aspect-[16/9] w-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </CardContent>
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{game.genre}</Badge>
                      <Badge variant="outline">
                        Checked {game.stats.checkedAt}
                      </Badge>
                    </div>
                    <CardTitle>{game.name} codes</CardTitle>
                    <CardDescription>{page.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {activeCodes.map((code) => (
                        <Badge key={code.code} variant="secondary">
                          {code.code}
                        </Badge>
                      ))}
                    </div>
                    <Link
                      href={page.href}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium"
                    >
                      Open codes
                      <ArrowRight className="size-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>How we choose new Roblox code pages</CardTitle>
              <CardDescription>
                Each page must help players and have a source trail we can
                maintain.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: 'Player need',
                  text: 'The game needs clear, repeated player questions that a focused code page can answer quickly.',
                },
                {
                  title: 'Source trail',
                  text: 'Codes must be supported by public source pages, official posts, or repeatable checks.',
                },
                {
                  title: 'Useful next steps',
                  text: 'A code page should connect players to relevant guides, class choices, update notes, or progression help.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-md border p-4">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {item.text}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
