import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsMapGuide } from '@/data/99-nights-map';
import {
  ninetyNineNightsMedia,
  ninetyNineNightsVideoSearches,
} from '@/data/99-nights-media';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  Compass,
  ExternalLink,
  Landmark,
  Map,
  Route,
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
    question: 'How do I expand the map in 99 Nights in the Forest?',
    answer:
      'Craft and place the map, then explore unrevealed areas during safe daytime routes. Recheck the map after each trip so new locations and route decisions are visible.',
  },
  {
    question: 'Is the 99 Nights in the Forest map the same every run?',
    answer:
      'Do not rely on fixed-coordinate routes. Quest Codes treats the map as route-planning guidance because layouts and discovery order can vary.',
  },
  {
    question: 'What should I look for on the map first?',
    answer:
      'Look for nearby structures, safe resource loops, missing child icons, and danger zones that need better gear before you commit.',
  },
  {
    question: 'Should I rescue missing kids immediately when I find them?',
    answer:
      'Not always. If the guards or travel route are too risky, mark the location and return after improving gear, food, class setup, or code rewards.',
  },
  {
    question: 'Does Quest Codes provide an official map?',
    answer:
      'No. This is a fan-made route guide based on checked public sources, not an official Roblox or game developer map.',
  },
];

const intentLabels = {
  'map-item': 'Map item',
  locations: 'Locations',
  'missing-kids': 'Missing kids',
  danger: 'Danger zones',
} as const;

const intentStyles = {
  'map-item': 'border-emerald-500/40 bg-emerald-500/10',
  locations: 'border-blue-500/40 bg-blue-500/10',
  'missing-kids': 'border-purple-500/40 bg-purple-500/10',
  danger: 'border-red-500/40 bg-red-500/10',
} as const;

const confidenceTone = {
  high: 'default',
  medium: 'secondary',
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl(
    '/roblox/99-nights-in-the-forest/map/',
    locale
  );

  return {
    title: `99 Nights in the Forest Map and Locations (${monthYear})`,
    description:
      'A source-checked 99 Nights in the Forest map guide for crafting the map, expanding revealed areas, planning locations, and finding missing kids safely.',
    keywords: seoKeywords.ninetyNineNightsMap,
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Map and Locations (${monthYear})`,
      description:
        'Use the 99 Nights in the Forest map as a route planner for locations, missing kids, and danger zones.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function MapGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl('/roblox/99-nights-in-the-forest/map/', locale);
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Map', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const howToSchema = buildHowToSchema({
    name: 'How to expand the 99 Nights in the Forest map',
    description:
      'Craft the map, explore safe routes, mark important locations, and return before night pressure breaks the run.',
    steps: [
      {
        name: 'Craft and place the map',
        text: 'Use the map as your planning board before committing to long exploration loops.',
      },
      {
        name: 'Explore unrevealed areas',
        text: 'Reveal nearby locations during daytime routes and return before your campfire or food route becomes unsafe.',
      },
      {
        name: 'Mark important discoveries',
        text: 'Use discoveries such as missing kids, structures, and danger zones to plan the next trip instead of forcing a risky rescue immediately.',
      },
      {
        name: 'Connect the route to progression',
        text: 'Use codes, classes, badges, and survival planning before attempting harder map objectives.',
      },
    ],
  });
  const itemListSchema = buildItemListSchema({
    name: '99 Nights in the Forest map planning sections',
    description:
      'Map item, locations, missing children, and danger-zone route guidance.',
    items: ninetyNineNightsMapGuide.sections.map((section) => ({
      name: section.title,
      url: `${pageUrl}#${section.intent}`,
      description: section.summary,
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
            <span className="text-foreground">Map</span>
          </nav>

          <Badge variant="outline" className="mb-4 gap-1.5">
            <Map className="size-3.5" />
            Checked {ninetyNineNightsMapGuide.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            99 Nights in the Forest map and locations guide
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            {ninetyNineNightsMapGuide.summary} Use this page to decide when to
            expand the map, which locations are worth a trip, and when to delay
            missing child or stronghold objectives.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/survival-guide"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            >
              Open survival route
            </Link>
            <Link
              href="/roblox/99-nights-in-the-forest/badges"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Check badges
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>No fixed-coordinate promise</CardTitle>
            <CardDescription>
              Map pages are easy to make misleading.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm leading-6">
            <p>
              Quest Codes does not present a fake universal coordinate map. This
              guide focuses on decisions: when to craft the map, what to reveal,
              and which route is safe enough for your current supplies.
            </p>
            <p>
              For exact item and structure names, source links remain visible so
              future update checks can refresh the route.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <GuideMediaPanel
          title="Map media and location research"
          description="Real game thumbnails for route context plus video-search signals for map, location, and danger-zone questions."
          images={[
            ninetyNineNightsMedia.images[0],
            ninetyNineNightsMedia.images[2],
          ]}
          videoSearches={[ninetyNineNightsVideoSearches.map]}
        />

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <Map className="text-primary size-5" />
              <CardTitle>Craft map</CardTitle>
              <CardDescription>
                Build the planning tool before long exploration.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Landmark className="text-primary size-5" />
              <CardTitle>Find locations</CardTitle>
              <CardDescription>
                Use structures as resource decisions.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Compass className="text-primary size-5" />
              <CardTitle>Track kids</CardTitle>
              <CardDescription>
                Mark missing child routes before forcing rescues.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <ShieldAlert className="text-primary size-5" />
              <CardTitle>Avoid traps</CardTitle>
              <CardDescription>
                Strongholds and subareas need preparation.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Map route plan
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Follow the map in decision order: reveal nearby areas, classify
              locations, mark missing kids, then prepare before danger zones.
            </p>
          </div>

          <div className="grid gap-4">
            {ninetyNineNightsMapGuide.sections.map((section) => (
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

                  <div className="grid gap-3 md:grid-cols-2">
                    {section.avoid.map((item) => (
                      <div key={item} className="bg-background rounded-md p-4">
                        <h3 className="text-sm font-semibold">Avoid</h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">Sources</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Related route pages</CardTitle>
              <CardDescription>
                Continue from map planning into action pages.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              {[
                {
                  href: '/roblox/99-nights-in-the-forest/survival-guide',
                  title: 'Survival guide',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/missing-kids',
                  title: 'Missing kids locations',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/stronghold',
                  title: 'Cultist Stronghold route',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/crafting',
                  title: 'Crafting guide',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/badges',
                  title: 'Badges guide',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/classes',
                  title: 'Class reference',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/codes',
                  title: 'Working codes',
                },
              ].map((item) => (
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
                Short answers for map and locations searches.
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
