import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsBandages } from '@/data/99-nights-bandages';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  ExternalLink,
  Hammer,
  HeartPulse,
  ShieldCheck,
  Users,
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
    question: 'How do I craft bandages in 99 Nights in the Forest?',
    answer:
      "Reach Campfire Level 4, bring an upgraded axe or chainsaw, find the Tool Workshop / Anvil, select the Bandage recipe, then place 2 Rabbit's Foot and 2 Wolf Pelt on the station.",
  },
  {
    question: 'What materials do bandages need?',
    answer:
      "The checked recipe is 2 Rabbit's Foot and 2 Wolf Pelt. PC Gamer also lists Campfire Level 4 and an upgraded axe or chainsaw for the workshop route.",
  },
  {
    question: 'Where is the Anvil or Tool Workshop?',
    answer:
      'Look for the Tool Workshop building marked with an Anvil icon. Some variants may require clearing branches or rebuilding a broken Anvil before crafting.',
  },
  {
    question: 'Can bandages revive teammates?',
    answer:
      'Yes. PC Gamer and Fandom-style guide data both treat bandages as revive and healing resources. Use them carefully because a revive can save a long route.',
  },
  {
    question: 'Should I use a bandage or medkit for revives?',
    answer:
      'Use a bandage for revives when possible and save medkits for bigger healing needs, especially in dangerous team routes.',
  },
  {
    question: 'Is this an official Roblox guide?',
    answer:
      'No. Quest Codes is a fan-made source-checked guide site and is not affiliated with Roblox or the 99 Nights in the Forest developer.',
  },
];

const intentLabels = {
  requirements: 'Requirements',
  workshop: 'Workshop',
  crafting: 'Crafting',
  revive: 'Revive use',
  stockpile: 'Stockpile',
} as const;

const intentStyles = {
  requirements: 'border-blue-500/40 bg-blue-500/10',
  workshop: 'border-amber-500/40 bg-amber-500/10',
  crafting: 'border-emerald-500/40 bg-emerald-500/10',
  revive: 'border-rose-500/40 bg-rose-500/10',
  stockpile: 'border-purple-500/40 bg-purple-500/10',
} as const;

const confidenceTone = {
  high: 'default',
  medium: 'secondary',
} as const;

const reliabilityLabels = {
  best: 'Best route',
  good: 'Good',
  rng: 'Random',
  class: 'Class-based',
} as const;

const relatedPages = [
  {
    href: '/roblox/99-nights-in-the-forest/crafting',
    title: 'Crafting bench and recipes',
  },
  {
    href: '/roblox/99-nights-in-the-forest/survival-guide',
    title: 'Survival guide',
  },
  {
    href: '/roblox/99-nights-in-the-forest/stronghold',
    title: 'Stronghold route',
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
    href: '/roblox/99-nights-in-the-forest/map',
    title: 'Map and locations',
  },
  {
    href: '/roblox/99-nights-in-the-forest/classes',
    title: 'Class reference',
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
    '/roblox/99-nights-in-the-forest/bandages/',
    locale
  );

  return {
    title: `How to Craft Bandages in 99 Nights in the Forest (${monthYear})`,
    description:
      'How to craft bandages in 99 Nights in the Forest with Anvil requirements, Rabbit Foot and Wolf Pelt materials, revive use, cooldown notes, and sources.',
    keywords: seoKeywords.ninetyNineNightsBandages,
    alternates: { canonical },
    openGraph: {
      title: `How to Craft Bandages in 99 Nights in the Forest (${monthYear})`,
      description:
        'Bandage crafting route, Anvil requirements, Rabbit Foot and Wolf Pelt materials, revive use, and source checks.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function BandagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/bandages/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Bandages', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const howToSchema = buildHowToSchema({
    name: 'How to craft bandages in 99 Nights in the Forest',
    description:
      'Find the Tool Workshop, use the Anvil, and craft bandages with Rabbit Foot and Wolf Pelt materials.',
    steps: [
      {
        name: 'Reach Campfire Level 4',
        text: 'Progress the camp enough that the bandage crafting route is available and worth planning.',
      },
      {
        name: 'Bring the right tool',
        text: 'Use an upgraded axe or chainsaw to clear the Tool Workshop entrance if branches block it.',
      },
      {
        name: 'Find the Tool Workshop or Anvil',
        text: 'Look for the Anvil-marked workshop and rebuild the station if the event variant requires it.',
      },
      {
        name: 'Place the materials',
        text: "Select Bandage, then place 2 Rabbit's Foot and 2 Wolf Pelt on the station.",
      },
      {
        name: 'Save bandages for revives',
        text: 'Carry crafted bandages for teammate revives and dangerous route recovery instead of wasting them after small fights.',
      },
    ],
  });
  const itemListSchema = buildItemListSchema({
    name: '99 Nights in the Forest bandage requirements',
    description:
      'Checked requirements and materials for crafting bandages in 99 Nights in the Forest.',
    items: ninetyNineNightsBandages.requirements.map((requirement) => ({
      name: requirement.label,
      url: `${pageUrl}#${requirement.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      description: requirement.detail,
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
            <span className="text-foreground">Bandages</span>
          </nav>

          <Badge variant="outline" className="mb-4 gap-1.5">
            <HeartPulse className="size-3.5" />
            Checked {ninetyNineNightsBandages.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            How to craft bandages in 99 Nights in the Forest
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            {ninetyNineNightsBandages.summary} This page separates checked
            crafting steps from random loot routes so you can plan revives
            without relying on luck.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/crafting"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            >
              Open crafting guide
            </Link>
            <Link
              href="/roblox/99-nights-in-the-forest/survival-guide"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Check survival route
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Short answer</CardTitle>
            <CardDescription>
              The craft is simple after the route is unlocked.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm leading-6">
            <p>
              Craft bandages at the Tool Workshop / Anvil with 2 Rabbit's Foot
              and 2 Wolf Pelt after Campfire Level 4.
            </p>
            <p>{ninetyNineNightsBandages.sourceNote}</p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <Hammer className="text-primary size-5" />
              <CardTitle>Find Anvil</CardTitle>
              <CardDescription>
                The Tool Workshop is the controlled crafting route.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <ShieldCheck className="text-primary size-5" />
              <CardTitle>Bring materials</CardTitle>
              <CardDescription>
                Save Rabbit's Foot and Wolf Pelt for the recipe.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <HeartPulse className="text-primary size-5" />
              <CardTitle>Save revives</CardTitle>
              <CardDescription>
                A bandage can rescue a long route.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Users className="text-primary size-5" />
              <CardTitle>Team value</CardTitle>
              <CardDescription>
                Group runs benefit more from revive stockpiles.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Bandage crafting requirements
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              These are the requirements we can safely publish today with source
              trails. Recheck after major updates because event variants can
              alter how the workshop appears.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {ninetyNineNightsBandages.requirements.map((requirement) => (
              <Card
                id={requirement.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                key={requirement.label}
              >
                <CardHeader>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{requirement.label}</Badge>
                    <Badge variant={confidenceTone[requirement.confidence]}>
                      {requirement.confidence} confidence
                    </Badge>
                  </div>
                  <CardDescription>{requirement.detail}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              How to craft and use bandages
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Follow this in order: unlock the route, reach the workshop, craft
              one bandage correctly, then save it for revives.
            </p>
          </div>

          <div className="grid gap-4">
            {ninetyNineNightsBandages.routes.map((route) => (
              <Card
                id={route.intent}
                key={route.title}
                className={intentStyles[route.intent]}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{intentLabels[route.intent]}</Badge>
                    <Badge variant={confidenceTone[route.confidence]}>
                      {route.confidence} confidence
                    </Badge>
                  </div>
                  <CardTitle>{route.title}</CardTitle>
                  <CardDescription>{route.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                    {route.steps.map((step) => (
                      <div
                        key={step}
                        className="bg-background/80 rounded-md border p-4"
                      >
                        <h3 className="text-sm font-semibold">Step</h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {step}
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
                        <h3 className="text-sm font-semibold">Caution</h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {caution}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">Sources</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Ways to get bandages</CardTitle>
              <CardDescription>
                Crafting is most controllable; exploration is still useful.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              {ninetyNineNightsBandages.methods.map((method) => (
                <div key={method.title} className="rounded-md border p-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge>{method.title}</Badge>
                    <Badge variant="secondary">
                      {reliabilityLabels[method.reliability]}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-3 leading-6">
                    {method.summary}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related 99 Nights pages</CardTitle>
              <CardDescription>
                Bandage decisions connect to crafting, survival, and dangerous
                route planning.
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
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <CardHeader>
                  <CardTitle className="text-base">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm leading-6">
                  {faq.answer}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
