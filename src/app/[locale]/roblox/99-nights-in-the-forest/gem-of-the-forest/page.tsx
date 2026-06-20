import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsForestGem } from '@/data/99-nights-forest-gem';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  Castle,
  ExternalLink,
  Gem,
  Hammer,
  MapPin,
  ShieldAlert,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildHowToSchema,
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
    question: 'How do I get Gem of the Forest in 99 Nights in the Forest?',
    answer:
      'The checked sources point to Cultist Stronghold rewards, Day 100+ nighttime raid cultists, Golden or Ruby Chests, and combining Forest Gem fragments.',
  },
  {
    question: 'How many Forest Gem fragments make one Gem of the Forest?',
    answer:
      'Fandom says 4 Gem of the Forest fragments can be combined into one full Gem of the Forest.',
  },
  {
    question: 'Is Gem of the Forest the same as diamonds or code gems?',
    answer:
      'No. Gem of the Forest is a late-game crafting material. Diamonds or normal gems are used for currency-style rewards such as classes and codes.',
  },
  {
    question: 'What should I spend my first Gem of the Forest on?',
    answer:
      'Use Crafting Bench Level 5 if you need access to multiple Tier 5 options. Use Respawn Capsule first if death is the main failure point.',
  },
  {
    question: 'Can chests guarantee Gem of the Forest?',
    answer:
      'The checked source lists Golden or Ruby Chests as possible sources, but this page does not claim a guaranteed drop rate.',
  },
  {
    question: 'Is this site affiliated with Roblox?',
    answer:
      'No. Quest Codes is a fan-made source-checked guide site and is not affiliated with Roblox or the 99 Nights in the Forest developer.',
  },
];

const routeLabels = {
  stronghold: 'Stronghold',
  'day-100-raid': 'Day 100+ raids',
  chests: 'Chests',
  fragments: 'Fragments',
} as const;

const routeStyles = {
  stronghold: 'border-amber-500/40 bg-amber-500/10',
  'day-100-raid': 'border-red-500/40 bg-red-500/10',
  chests: 'border-blue-500/40 bg-blue-500/10',
  fragments: 'border-emerald-500/40 bg-emerald-500/10',
} as const;

const useLabels = {
  'bench-upgrade': 'Bench upgrade',
  'tier-5-craft': 'Tier 5 craft',
  conversion: 'Conversion',
} as const;

const confidenceTone = {
  high: 'default',
  medium: 'secondary',
} as const;

const relatedPages = [
  {
    href: '/roblox/99-nights-in-the-forest/forest-gem-fragments',
    title: 'Forest Gem fragments',
  },
  {
    href: '/roblox/99-nights-in-the-forest/crafting-bench-5',
    title: 'Crafting Bench 5',
  },
  {
    href: '/roblox/99-nights-in-the-forest/stronghold',
    title: 'Cultist Stronghold',
  },
  {
    href: '/roblox/99-nights-in-the-forest/crafting',
    title: 'Crafting guide',
  },
  {
    href: '/roblox/99-nights-in-the-forest/gems',
    title: 'Gems and diamonds',
  },
  {
    href: '/roblox/99-nights-in-the-forest/bandages',
    title: 'Bandage crafting route',
  },
  {
    href: '/roblox/99-nights-in-the-forest/survival-guide',
    title: 'Survival guide',
  },
  {
    href: '/roblox/99-nights-in-the-forest/codes',
    title: 'Working codes',
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl(
    '/roblox/99-nights-in-the-forest/gem-of-the-forest/',
    locale
  );

  return {
    title: `99 Nights in the Forest Gem of the Forest (${monthYear})`,
    description:
      'How to get Gem of the Forest in 99 Nights in the Forest from Stronghold rewards, Day 100 raids, chest drops, fragments, and Tier 5 crafting uses.',
    keywords: seoKeywords.ninetyNineNightsForestGem,
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Gem of the Forest (${monthYear})`,
      description:
        'Source-checked Forest Gem sources, fragment notes, and Tier 5 craft decisions.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function ForestGemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/gem-of-the-forest/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Gem of the Forest', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const howToSchema = buildHowToSchema({
    name: 'How to get Gem of the Forest in 99 Nights in the Forest',
    description:
      'Use source-checked routes before spending Gem of the Forest on Bench 5 or Tier 5 crafts.',
    steps: [
      {
        name: 'Prepare a late-game route',
        text: 'Do not chase Forest Gem before food, recovery, ranged damage, and camp safety are stable.',
      },
      {
        name: 'Use Stronghold as the primary checked objective',
        text: 'Plan a Cultist Stronghold run only after reviewing the Stronghold route and exit plan.',
      },
      {
        name: 'Track Day 100+ fragments',
        text: 'Save fragments from late nighttime raid cultists until four can be combined into one Gem of the Forest.',
      },
      {
        name: 'Treat Golden and Ruby Chests as bonus routes',
        text: 'Use chest rewards as supplemental value because this page does not publish unsupported drop rates.',
      },
      {
        name: 'Pick the spend before crafting',
        text: 'Choose Bench 5, Respawn Capsule, Temporal Accelerometer, Weather Machine, or Recycler based on what is blocking the run.',
      },
    ],
  });
  const itemListSchema = buildItemListSchema({
    name: '99 Nights in the Forest Gem of the Forest sources and uses',
    description:
      'Source-checked ways to get and spend Gem of the Forest in 99 Nights in the Forest.',
    items: [
      ...ninetyNineNightsForestGem.routes.map((route) => ({
        name: route.title,
        url: `${pageUrl}#${route.type}`,
        description: route.summary,
      })),
      ...ninetyNineNightsForestGem.uses.map((use) => ({
        name: use.name,
        url: `${pageUrl}#${use.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        description: use.decision,
      })),
    ],
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
      {[
        breadcrumbSchema,
        faqSchema,
        howToSchema,
        itemListSchema,
        videoGameSchema,
      ].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

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
            <span className="text-foreground">Gem of the Forest</span>
          </nav>

          <Badge variant="outline" className="mb-4 gap-1.5">
            <Gem className="size-3.5" />
            Checked {ninetyNineNightsForestGem.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            How to get Gem of the Forest in 99 Nights in the Forest
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            {ninetyNineNightsForestGem.summary} Use this page to separate Forest
            Gem routes from normal diamonds, then decide whether the first full
            gem should go into Crafting Bench 5 or a Tier 5 craft.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/stronghold"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            >
              Plan Stronghold route
            </Link>
            <Link
              href="/roblox/99-nights-in-the-forest/crafting-bench-5"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Compare Bench 5 spends
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Short answer</CardTitle>
            <CardDescription>
              Forest Gem is a late-game crafting material.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm leading-6">
            <p>{ninetyNineNightsForestGem.sourceNote}</p>
            <p>
              Four Forest Gem fragments can be combined into one full Gem of the
              Forest, based on the checked Fandom data.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <Castle className="text-primary size-5" />
              <CardTitle>Stronghold route</CardTitle>
              <CardDescription>
                Highest-confidence objective source.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <ShieldAlert className="text-primary size-5" />
              <CardTitle>Day 100+</CardTitle>
              <CardDescription>
                Nighttime raid fragments belong to long runs.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <MapPin className="text-primary size-5" />
              <CardTitle>Chest bonus</CardTitle>
              <CardDescription>
                Golden and Ruby Chests are not treated as guaranteed farms.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Hammer className="text-primary size-5" />
              <CardTitle>Tier 5 spend</CardTitle>
              <CardDescription>
                Bench 5, capsule, night skip, weather, or conversion.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Forest Gem source routes
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Follow these routes by confidence. Stronghold and fragments are
              checked facts; chest routes are listed but not turned into
              unsupported drop-rate claims.
            </p>
          </div>

          <div className="grid gap-4">
            {ninetyNineNightsForestGem.routes.map((route) => (
              <Card
                id={route.type}
                key={route.title}
                className={routeStyles[route.type]}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{routeLabels[route.type]}</Badge>
                    <Badge variant={confidenceTone[route.confidence]}>
                      {route.confidence} confidence
                    </Badge>
                  </div>
                  <CardTitle>{route.title}</CardTitle>
                  <CardDescription>{route.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-3 md:grid-cols-3">
                    {route.actions.map((action) => (
                      <div
                        key={action}
                        className="bg-background/80 rounded-md border p-4"
                      >
                        <h3 className="text-sm font-semibold">Do this</h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {action}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {route.cautions.map((caution) => (
                      <div
                        key={caution}
                        className="bg-background rounded-md p-4"
                      >
                        <h3 className="flex items-center gap-2 text-sm font-semibold">
                          <ShieldAlert className="size-4" />
                          Avoid
                        </h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {caution}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {route.sources.map((source) => (
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
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              What to spend Gem of the Forest on
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Every spend is expensive. Pick the one that fixes the real blocker
              in the run instead of copying a recipe list blindly.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {ninetyNineNightsForestGem.uses.map((use) => (
              <Card
                id={use.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                key={use.name}
              >
                <CardHeader>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{useLabels[use.type]}</Badge>
                    {use.materials.map((material) => (
                      <Badge key={material} variant="outline">
                        {material}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle>{use.name}</CardTitle>
                  <CardDescription>{use.effect}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/40 rounded-md p-4">
                    <h3 className="text-sm font-semibold">Decision</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-6">
                      {use.decision}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {use.sources.map((source) => (
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
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Related 99 Nights pages</CardTitle>
              <CardDescription>
                Forest Gem routes connect to Stronghold, crafting, and recovery
                decisions.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              {relatedPages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:bg-accent rounded-md border p-3"
                >
                  {item.title}
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>
                Short answers for Forest Gem searches.
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
        </section>
      </section>
    </main>
  );
}
