import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsCrafting } from '@/data/99-nights-crafting';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  Compass,
  ExternalLink,
  Gem,
  Hammer,
  HeartPulse,
  Shield,
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
    question: 'What should I craft first in 99 Nights in the Forest?',
    answer:
      'Craft the map first, then use Compass and Sun Dial once you start taking longer routes. After basic camp needs are stable, push toward Crafting Bench Tier 3.',
  },
  {
    question: 'Is this a complete crafting recipes list?',
    answer:
      'No. This page is a source-checked priority guide for important crafts. It avoids claiming a complete realtime recipe list because recipes and event items can change.',
  },
  {
    question: 'How do I craft bandages in 99 Nights in the Forest?',
    answer:
      'PC Gamer lists Campfire Level 4, an upgraded axe or chainsaw, 2 Rabbit Foot, and 2 Wolf Pelt as the checked bandage craft requirements.',
  },
  {
    question: 'When should I upgrade the Crafting Bench?',
    answer:
      'Upgrade after early map and camp stability. Crafting Bench Tier 3 opens important mid-run crafts such as Crock Pot, Biofuel Processor, Lightning Rod, and Good Bed.',
  },
  {
    question: 'Are Cultist Gem crafts worth it?',
    answer:
      'They can be, but they are late-run decisions. Check the Stronghold and gems pages before spending Cultist Gems on Ammo Crate, Oil Drill, or Teleporter.',
  },
  {
    question: 'Is this site affiliated with Roblox?',
    answer:
      'No. Quest Codes is a fan-made guide site and is not affiliated with Roblox or the 99 Nights in the Forest developer.',
  },
];

const roleLabels = {
  navigation: 'Navigation',
  base: 'Base',
  food: 'Food',
  recovery: 'Recovery',
  fuel: 'Fuel',
  combat: 'Combat',
  'late-game': 'Late game',
} as const;

const priorityLabels = {
  first: 'First',
  early: 'Early',
  'mid-run': 'Mid-run',
  'late-run': 'Late-run',
  situational: 'Situational',
} as const;

const sectionLabels = {
  'starter-route': 'Starter route',
  'base-defense': 'Base defense',
  'food-recovery': 'Food and recovery',
  'fuel-weather': 'Fuel and weather',
  'late-game': 'Late game',
} as const;

const sectionStyles = {
  'starter-route': 'border-blue-500/40 bg-blue-500/10',
  'base-defense': 'border-emerald-500/40 bg-emerald-500/10',
  'food-recovery': 'border-rose-500/40 bg-rose-500/10',
  'fuel-weather': 'border-amber-500/40 bg-amber-500/10',
  'late-game': 'border-purple-500/40 bg-purple-500/10',
} as const;

const confidenceTone = {
  high: 'default',
  medium: 'secondary',
} as const;

const relatedPages = [
  {
    href: '/roblox/99-nights-in-the-forest/survival-guide',
    title: 'Survival guide',
  },
  {
    href: '/roblox/99-nights-in-the-forest/map',
    title: 'Map and locations',
  },
  {
    href: '/roblox/99-nights-in-the-forest/stronghold',
    title: 'Cultist Stronghold',
  },
  {
    href: '/roblox/99-nights-in-the-forest/crafting-bench-5',
    title: 'Crafting Bench 5',
  },
  {
    href: '/roblox/99-nights-in-the-forest/gem-of-the-forest',
    title: 'Gem of the Forest route',
  },
  {
    href: '/roblox/99-nights-in-the-forest/bandages',
    title: 'How to craft bandages',
  },
  {
    href: '/roblox/99-nights-in-the-forest/gems',
    title: 'Gems and diamonds',
  },
  {
    href: '/roblox/99-nights-in-the-forest/animals',
    title: 'Animals and taming',
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
    '/roblox/99-nights-in-the-forest/crafting/',
    locale
  );

  return {
    title: `99 Nights in the Forest Crafting Guide (${monthYear})`,
    description:
      'Source-checked 99 Nights in the Forest crafting guide for map, crafting bench, Crock Pot, bandages, fuel, weather, and late-game gem crafts.',
    keywords: seoKeywords.ninetyNineNightsCrafting,
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Crafting Guide (${monthYear})`,
      description:
        'Crafting priorities, key recipes, bench upgrades, bandages, and late-game craft decisions for 99 Nights in the Forest.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function CraftingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/crafting/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Crafting', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const howToSchema = buildHowToSchema({
    name: 'How to plan crafting in 99 Nights in the Forest',
    description:
      'Use crafting priorities to support navigation, camp safety, food, recovery, fuel, and late-game objectives.',
    steps: [
      {
        name: 'Craft the map first',
        text: 'Use the map to make route decisions before taking long trips away from camp.',
      },
      {
        name: 'Add Compass and Sun Dial',
        text: 'Use navigation and timing tools when missing kids, structures, or Stronghold routes become priorities.',
      },
      {
        name: 'Upgrade toward Crafting Bench Tier 3',
        text: 'Tier 3 unlocks important mid-run utility such as Crock Pot, Biofuel Processor, Lightning Rod, and better camp tools.',
      },
      {
        name: 'Save recovery crafts for emergencies',
        text: 'Treat bandages and medkits as revive resources, especially in team runs or dangerous objectives.',
      },
      {
        name: 'Delay gem crafts until the route supports them',
        text: 'Use Cultist Gem and Forest Gem crafts only after checking Stronghold, gems, and late-game needs.',
      },
    ],
  });
  const itemListSchema = buildItemListSchema({
    name: '99 Nights in the Forest key crafting priorities',
    description:
      'Source-checked key crafts for route planning, survival, recovery, fuel, combat, and late-game progression.',
    items: ninetyNineNightsCrafting.items.map((item) => ({
      name: item.name,
      url: `${pageUrl}#${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      description: item.why,
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
            <span className="text-foreground">Crafting</span>
          </nav>

          <Badge variant="outline" className="mb-4 gap-1.5">
            <Hammer className="size-3.5" />
            Checked {ninetyNineNightsCrafting.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            99 Nights in the Forest crafting guide
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            {ninetyNineNightsCrafting.summary} Use this page to decide which
            crafts support the next route instead of spending Wood, Scrap,
            Cultist Gems, or Forest Gems without a plan.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/survival-guide"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            >
              Open survival route
            </Link>
            <Link
              href="/roblox/99-nights-in-the-forest/stronghold"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Check Stronghold route
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Not a fake full recipe table</CardTitle>
            <CardDescription>
              The page is optimized for reliable decisions.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm leading-6">
            <p>{ninetyNineNightsCrafting.sourceNote}</p>
            <p>
              Complete recipe tables are useful later, but only after we add a
              refresh process for patch changes and event-only items.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <Compass className="text-primary size-5" />
              <CardTitle>Route first</CardTitle>
              <CardDescription>
                Map, Compass, and Sun Dial stop blind exploration.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="text-primary size-5" />
              <CardTitle>Protect camp</CardTitle>
              <CardDescription>
                Walls, gates, and careful wood spending reduce collapse risk.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <HeartPulse className="text-primary size-5" />
              <CardTitle>Save revives</CardTitle>
              <CardDescription>
                Bandages matter most when a revive saves the run.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Gem className="text-primary size-5" />
              <CardTitle>Delay gem crafts</CardTitle>
              <CardDescription>
                Cultist Gem and Forest Gem crafts belong to late planning.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Crafting priority route
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Follow this order before checking individual items: navigation,
              base defense, food and recovery, fuel and weather, then late-game
              gem crafts.
            </p>
          </div>

          <div className="grid gap-4">
            {ninetyNineNightsCrafting.sections.map((section) => (
              <Card
                id={section.intent}
                key={section.title}
                className={sectionStyles[section.intent]}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{sectionLabels[section.intent]}</Badge>
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
                    {section.items.map((item) => (
                      <Badge key={item} variant="outline">
                        {item}
                      </Badge>
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
              Key crafts and requirements
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              These are the crafts we can safely include today with visible
              source trails. Use materials as a planning reference and recheck
              after major updates.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {ninetyNineNightsCrafting.items.map((item) => (
              <Card
                id={item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                key={item.name}
              >
                <CardHeader>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{priorityLabels[item.priority]}</Badge>
                    <Badge variant="secondary">{roleLabels[item.role]}</Badge>
                    <Badge variant="outline">{item.tier}</Badge>
                  </div>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.why}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold">Materials</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.materials.map((material) => (
                        <Badge key={material} variant="outline">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-muted/40 rounded-md p-4">
                    <h3 className="text-sm font-semibold">Caution</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-6">
                      {item.caution}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Sources</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.sources.map((source) => (
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
        </section>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Related 99 Nights pages</CardTitle>
              <CardDescription>
                Crafting decisions connect to routes, recovery, and late-game
                farming.
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
                Short answers for crafting and recipe searches.
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
