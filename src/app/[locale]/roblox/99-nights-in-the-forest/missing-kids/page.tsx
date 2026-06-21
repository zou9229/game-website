import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ninetyNineNightsMedia,
  ninetyNineNightsVideoSearches,
} from '@/data/99-nights-media';
import { ninetyNineNightsMissingKids } from '@/data/99-nights-missing-kids';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  Compass,
  ExternalLink,
  Map,
  Route,
  ShieldAlert,
  UserCheck,
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
    question: 'Where are the missing kids in 99 Nights in the Forest?',
    answer:
      'The missing kids are found through exploration routes that become easier to track with a crafted map and compass. The checked standard set covers Dino Kid, Kraken Kid, Squid Kid, and Koala Kid.',
  },
  {
    question: 'Which missing kid should I rescue first?',
    answer:
      'Dino Kid is the safest first target in the checked source set. The other routes should wait until your campfire, gear, and supplies are stronger.',
  },
  {
    question: 'Do I need the map and compass?',
    answer:
      'They are strongly recommended. PC Gamer suggests building a map and compass before heading out because discovered child locations can be marked and revisited.',
  },
  {
    question: 'Should I rescue a child as soon as I find one?',
    answer:
      'No. If the guard enemies are too hard or night pressure is bad, mark the location and return after restabilizing camp.',
  },
  {
    question: 'Is this an official 99 Nights in the Forest missing kids map?',
    answer:
      "No. Quest Codes is fan-made and uses checked public sources. It does not provide an official Roblox or Grandma's Favourite Games map.",
  },
];

const riskTone = {
  low: 'default',
  medium: 'secondary',
  high: 'outline',
  'very-high': 'destructive',
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl(
    '/roblox/99-nights-in-the-forest/missing-kids/',
    locale
  );

  return {
    title: `99 Nights in the Forest Missing Kids Locations (${monthYear})`,
    description:
      'Source-checked 99 Nights in the Forest missing kids route guide for Dino Kid, Kraken Kid, Squid Kid, Koala Kid, map planning, and rescue prep.',
    keywords: seoKeywords.ninetyNineNightsMissingKids,
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Missing Kids Locations (${monthYear})`,
      description:
        'Plan the missing kids route with map, compass, campfire, gear, and rescue risk notes.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function MissingKidsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/missing-kids/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Missing Kids', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const howToSchema = buildHowToSchema({
    name: 'How to find missing kids in 99 Nights in the Forest',
    description:
      'Build map and compass, reveal routes safely, mark child locations, and rescue when the guard risk matches your gear.',
    steps: [
      {
        name: 'Build map and compass',
        text: 'Craft navigation tools before long rescue trips so discovered locations can be tracked.',
      },
      {
        name: 'Reveal the route during safe daytime loops',
        text: 'Explore while food, fuel, and return timing are stable enough to avoid losing the run.',
      },
      {
        name: 'Mark the child location',
        text: 'If the guards are too strong, leave the child marked and come back with better gear.',
      },
      {
        name: 'Rescue and restabilize camp',
        text: 'After each rescue, return to camp, refill supplies, and prepare for the next harder route.',
      },
    ],
  });
  const itemListSchema = buildItemListSchema({
    name: '99 Nights in the Forest missing kids rescue order',
    description:
      'Dino Kid, Kraken Kid, Squid Kid, and Koala Kid route planning notes.',
    items: ninetyNineNightsMissingKids.kids.map((kid) => ({
      name: kid.name,
      url: `${pageUrl}#${kid.name.toLowerCase().replaceAll(' ', '-')}`,
      description: kid.summary,
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
            <span className="text-foreground">Missing Kids</span>
          </nav>

          <Badge variant="outline" className="mb-4 gap-1.5">
            <UserCheck className="size-3.5" />
            Checked {ninetyNineNightsMissingKids.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            99 Nights in the Forest missing kids locations
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            {ninetyNineNightsMissingKids.summary} This page focuses on rescue
            order, guard risk, preparation, and when to delay a child route
            instead of losing the run.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/map"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            >
              Open map guide
            </Link>
            <Link
              href="/roblox/99-nights-in-the-forest/survival-guide"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Survival route
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rescue rule</CardTitle>
            <CardDescription>
              Finding a child is not the same as safely rescuing one.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm leading-6">
            {ninetyNineNightsMissingKids.routeNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <GuideMediaPanel
          title="Missing kids media and route research"
          description="Real game thumbnails for night pressure and rescue context plus video-search signals for current route questions."
          images={[
            ninetyNineNightsMedia.images[2],
            ninetyNineNightsMedia.images[0],
          ]}
          videoSearches={[ninetyNineNightsVideoSearches.missingKids]}
        />

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <Map className="text-primary size-5" />
              <CardTitle>Build map</CardTitle>
              <CardDescription>
                Reveal routes and mark child locations.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Compass className="text-primary size-5" />
              <CardTitle>Use compass</CardTitle>
              <CardDescription>
                Keep a return path before night pressure rises.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <ShieldAlert className="text-primary size-5" />
              <CardTitle>Check guards</CardTitle>
              <CardDescription>
                Delay the rescue if the enemy risk is too high.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Route className="text-primary size-5" />
              <CardTitle>Restabilize</CardTitle>
              <CardDescription>
                Return to camp before starting the next route.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Rescue order and route notes
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Use this as a planning order, not a fixed-coordinate map. The
              value is knowing when each rescue becomes too risky.
            </p>
          </div>

          <div className="grid gap-4">
            {ninetyNineNightsMissingKids.kids.map((kid) => (
              <Card
                id={kid.name.toLowerCase().replaceAll(' ', '-')}
                key={kid.name}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>Route {kid.order}</Badge>
                    <Badge variant={riskTone[kid.guardRisk]}>
                      {kid.guardRisk} guard risk
                    </Badge>
                    <Badge variant="outline">{kid.tentColor} tent</Badge>
                  </div>
                  <CardTitle>{kid.name}</CardTitle>
                  <CardDescription>{kid.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="rounded-md border p-4">
                    <h3 className="text-sm font-semibold">Route signal</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-6">
                      {kid.routeSignal}
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {kid.preparation.map((item) => (
                      <div key={item} className="rounded-md border p-4">
                        <h3 className="text-sm font-semibold">Prepare</h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">Sources</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {kid.sources.map((source) => (
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
              <CardTitle>Related planning pages</CardTitle>
              <CardDescription>
                Use these before attempting harder child routes.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              {[
                {
                  href: '/roblox/99-nights-in-the-forest/map',
                  title: 'Map and locations guide',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/survival-guide',
                  title: 'Survival guide',
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
                Short answers for missing kids location searches.
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
