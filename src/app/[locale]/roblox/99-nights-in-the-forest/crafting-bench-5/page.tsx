import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsCraftingBench5 } from '@/data/99-nights-crafting-bench-5';
import {
  ninetyNineNightsMedia,
  ninetyNineNightsVideoSearches,
} from '@/data/99-nights-media';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  Clock,
  CloudRain,
  ExternalLink,
  Gem,
  Hammer,
  RefreshCw,
  RotateCcw,
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
import { GuideMediaPanel } from '@/components/roblox/guide-media-panel';
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
    question: 'How do I get Crafting Bench 5 in 99 Nights in the Forest?',
    answer:
      'Upgrade the crafting bench with 50 Wood, 50 Scrap, and 1 Gem of the Forest after your route is stable enough to spare those materials.',
  },
  {
    question: 'What does Crafting Bench 5 unlock?',
    answer:
      'The source-checked Tier 5 crafts on this page are Respawn Capsule, Temporal Accelerometer, Weather Machine, and Recycler.',
  },
  {
    question: 'Where do I get Gem of the Forest?',
    answer:
      'Fandom ties Gem of the Forest to late-game sources and fragments. Treat it as the bottleneck material before spending on Bench 5 or Tier 5 recipes.',
  },
  {
    question: 'What should I craft first at Crafting Bench 5?',
    answer:
      'Respawn Capsule is the safest first pick for solo and small teams. Temporal Accelerometer is stronger for speedrun pacing, Weather Machine is situational for storm-heavy routes, and Recycler is a conversion pick.',
  },
  {
    question: 'Are Logs and Wood or Bolts and Scrap the same here?',
    answer:
      'Some media uses different wording. Quest Codes normalizes the material names as Wood and Scrap to match the site crafting cluster.',
  },
  {
    question: 'Is this site affiliated with Roblox?',
    answer:
      'No. Quest Codes is a fan-made source-checked guide site and is not affiliated with Roblox or the 99 Nights in the Forest developer.',
  },
];

const intentLabels = {
  unlock: 'Unlock',
  'gem-route': 'Gem route',
  'first-craft': 'First craft',
  'source-note': 'Source note',
} as const;

const intentStyles = {
  unlock: 'border-blue-500/40 bg-blue-500/10',
  'gem-route': 'border-emerald-500/40 bg-emerald-500/10',
  'first-craft': 'border-purple-500/40 bg-purple-500/10',
  'source-note': 'border-slate-500/40 bg-slate-500/10',
} as const;

const bestForLabels = {
  solo: 'Solo safety',
  speedrun: 'Speedrun',
  weather: 'Weather control',
  conversion: 'Conversion',
  'long-run': 'Long run',
} as const;

const bestForIcons = {
  solo: RotateCcw,
  speedrun: Clock,
  weather: CloudRain,
  conversion: RefreshCw,
  'long-run': Hammer,
} as const;

const confidenceTone = {
  high: 'default',
  medium: 'secondary',
} as const;

const relatedPages = [
  {
    href: '/roblox/99-nights-in-the-forest/crafting',
    title: 'Crafting bench and recipes',
  },
  {
    href: '/roblox/99-nights-in-the-forest/gem-of-the-forest',
    title: 'Gem of the Forest route',
  },
  {
    href: '/roblox/99-nights-in-the-forest/forest-gem-fragments',
    title: 'Forest Gem fragments',
  },
  {
    href: '/roblox/99-nights-in-the-forest/gems',
    title: 'Gems and diamonds',
  },
  {
    href: '/roblox/99-nights-in-the-forest/stronghold',
    title: 'Stronghold route',
  },
  {
    href: '/roblox/99-nights-in-the-forest/bandages',
    title: 'How to craft bandages',
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
    '/roblox/99-nights-in-the-forest/crafting-bench-5/',
    locale
  );

  return {
    title: `99 Nights in the Forest Crafting Bench 5 (${monthYear})`,
    description:
      'Crafting Bench 5 requirements, Forest Gem route, Tier 5 recipes, and whether Respawn Capsule, Temporal Accelerometer, Weather Machine, or Recycler is best.',
    keywords: seoKeywords.ninetyNineNightsCraftingBench5,
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Crafting Bench 5 (${monthYear})`,
      description:
        'Upgrade requirements, Forest Gem planning, and Tier 5 recipe decisions for 99 Nights in the Forest.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function CraftingBench5Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/crafting-bench-5/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Crafting Bench 5', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const howToSchema = buildHowToSchema({
    name: 'How to plan Crafting Bench 5 in 99 Nights in the Forest',
    description:
      'Use Bench 5 only after the route can support Wood, Scrap, and Forest Gem spending.',
    steps: [
      {
        name: 'Stabilize the route first',
        text: 'Complete early navigation, food, fuel, and revive priorities before saving for level 5.',
      },
      {
        name: 'Bank 50 Wood and 50 Scrap',
        text: 'Do not drain campfire, wall, or recovery needs just to rush the upgrade.',
      },
      {
        name: 'Secure a Gem of the Forest',
        text: 'Treat Gem of the Forest as the bottleneck and check gem routes before spending it.',
      },
      {
        name: 'Pick the first Tier 5 craft by risk',
        text: 'Choose Respawn Capsule for death risk, Temporal Accelerometer for night skipping, Weather Machine for storm control, or Recycler for conversion value.',
      },
    ],
  });
  const itemListSchema = buildItemListSchema({
    name: '99 Nights in the Forest Crafting Bench 5 recipes',
    description:
      'Tier 5 recipe choices and recommendations for Crafting Bench 5.',
    items: ninetyNineNightsCraftingBench5.recipes.map((recipe) => ({
      name: recipe.name,
      url: `${pageUrl}#${recipe.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      description: recipe.recommendation,
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
            <span className="text-foreground">Crafting Bench 5</span>
          </nav>

          <Badge variant="outline" className="mb-4 gap-1.5">
            <Hammer className="size-3.5" />
            Checked {ninetyNineNightsCraftingBench5.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            99 Nights in the Forest crafting bench 5 guide
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            {ninetyNineNightsCraftingBench5.summary} This page focuses on the
            real decision: whether the first Forest Gem should go into Bench 5,
            Respawn Capsule, Temporal Accelerometer, Weather Machine, or
            Recycler.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/gem-of-the-forest"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            >
              Plan Forest Gem route
            </Link>
            <Link
              href="/roblox/99-nights-in-the-forest/crafting"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Open crafting guide
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Short answer</CardTitle>
            <CardDescription>
              Bench 5 is powerful, but it is not an early craft.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm leading-6">
            <p>
              Crafting Bench 5 costs 50 Wood, 50 Scrap, and 1 Gem of the Forest.
            </p>
            <p>{ninetyNineNightsCraftingBench5.sourceNote}</p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <GuideMediaPanel
          title="Bench 5 media and route research"
          description="Real game thumbnails for late-run camp context plus current video searches for Bench 5 confusion."
          images={[
            ninetyNineNightsMedia.images[1],
            ninetyNineNightsMedia.images[0],
          ]}
          videoSearches={[ninetyNineNightsVideoSearches.craftingBench]}
        />

        <div className="grid gap-4 md:grid-cols-3">
          {ninetyNineNightsCraftingBench5.requirements.map((requirement) => (
            <Card
              id={requirement.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              key={requirement.label}
            >
              <CardHeader>
                <Gem className="text-primary size-5" />
                <CardTitle>{requirement.label}</CardTitle>
                <CardDescription>{requirement.detail}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {requirement.sources.map((source) => (
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
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Crafting Bench 5 decision route
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Follow this order before committing a Forest Gem. The page labels
              confidence so checked facts stay separate from player preference.
            </p>
          </div>

          <div className="grid gap-4">
            {ninetyNineNightsCraftingBench5.sections.map((section) => (
              <Card
                id={section.intent}
                key={section.title}
                className={intentStyles[section.intent]}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{intentLabels[section.intent]}</Badge>
                    <Badge variant={confidenceTone[section.confidence]}>
                      {section.confidence} confidence
                    </Badge>
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-3 md:grid-cols-3">
                    {section.actions.map((action) => (
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
                  <div className="flex flex-wrap gap-2">
                    {section.sources.map((source) => (
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
              Tier 5 recipe comparison
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Each recipe consumes the same rare Forest Gem cost. Pick the one
              that fixes the way your runs usually fail.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {ninetyNineNightsCraftingBench5.recipes.map((recipe) => {
              const Icon = bestForIcons[recipe.bestFor];

              return (
                <Card
                  id={recipe.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                  key={recipe.name}
                >
                  <CardHeader>
                    <Icon className="text-primary size-5" />
                    <div className="flex flex-wrap gap-2">
                      <Badge>{bestForLabels[recipe.bestFor]}</Badge>
                      {recipe.materials.map((material) => (
                        <Badge key={material} variant="outline">
                          {material}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle>{recipe.name}</CardTitle>
                    <CardDescription>{recipe.effect}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="bg-muted/40 rounded-md p-4">
                      <h3 className="font-semibold">Recommendation</h3>
                      <p className="text-muted-foreground mt-2 leading-6">
                        {recipe.recommendation}
                      </p>
                    </div>
                    {recipe.cautions.map((caution) => (
                      <p
                        key={caution}
                        className="text-muted-foreground rounded-md border p-3 leading-6"
                      >
                        {caution}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Related 99 Nights pages</CardTitle>
              <CardDescription>
                Bench 5 decisions connect to gems, Stronghold, recovery, and
                general crafting.
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
                Short answers for Crafting Bench 5 searches.
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
