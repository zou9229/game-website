import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsPeltTrader } from '@/data/99-nights-pelt-trader';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  ExternalLink,
  HeartPulse,
  ShieldCheck,
  Shirt,
  Store,
} from 'lucide-react';

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
    question: 'What should I do with Wolf Pelt in 99 Nights in the Forest?',
    answer:
      'Use Wolf Pelt only after deciding whether your run needs a Pelt Trader item or bandage materials more. If the team still needs revives, saving Wolf Pelt for the bandage route is safer.',
  },
  {
    question: 'Does the Pelt Trader give Medkits?',
    answer:
      'Quest Codes does not list Medkit as a confirmed Pelt Trader reward unless the checked trader source confirms it. Medkit is treated as a separate recovery item and route decision.',
  },
  {
    question: 'Should I trade Wolf Pelt or craft bandages?',
    answer:
      'Craft bandages first when recovery and revives matter. Trade surplus Wolf Pelt only when the offered item solves the current route problem.',
  },
  {
    question: 'Is Medkit better than Bandage?',
    answer:
      'Medkit is a stronger recovery item, while bandages are better to preserve for revives and controlled recovery routes. Do not waste either after minor fights if campfire healing is safe.',
  },
  {
    question: 'Is this an official Roblox guide?',
    answer:
      'No. Quest Codes is a fan-made source-checked guide site and is not affiliated with Roblox or the 99 Nights in the Forest developer.',
  },
];

const intentLabels = {
  location: 'Trader route',
  'wolf-pelt': 'Wolf Pelt',
  bandage: 'Bandages',
  medkit: 'Medkit',
  'trade-caution': 'Caution',
} as const;

const intentStyles = {
  location: 'border-amber-500/40 bg-amber-500/10',
  'wolf-pelt': 'border-lime-500/40 bg-lime-500/10',
  bandage: 'border-emerald-500/40 bg-emerald-500/10',
  medkit: 'border-rose-500/40 bg-rose-500/10',
  'trade-caution': 'border-blue-500/40 bg-blue-500/10',
} as const;

const confidenceTone = {
  high: 'default',
  medium: 'secondary',
} as const;

const relatedPages = [
  {
    href: '/roblox/99-nights-in-the-forest/bandages',
    title: 'Bandage crafting route',
  },
  {
    href: '/roblox/99-nights-in-the-forest/crafting',
    title: 'Crafting guide',
  },
  {
    href: '/roblox/99-nights-in-the-forest/survival-guide',
    title: 'Survival guide',
  },
  {
    href: '/roblox/99-nights-in-the-forest/map',
    title: 'Map and locations',
  },
  {
    href: '/roblox/99-nights-in-the-forest/missing-kids',
    title: 'Missing Kids route',
  },
  {
    href: '/roblox/99-nights-in-the-forest/stronghold',
    title: 'Stronghold route',
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
    '/roblox/99-nights-in-the-forest/pelt-trader/',
    locale
  );

  return {
    title: `99 Nights in the Forest Pelt Trader Guide (${monthYear})`,
    description:
      'Source-checked Pelt Trader guide for 99 Nights in the Forest covering Wolf Pelt, Medkit, bandages, trade cautions, and recovery route decisions.',
    keywords: seoKeywords.ninetyNineNightsPeltTrader,
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Pelt Trader Guide (${monthYear})`,
      description:
        'Decide whether to trade Wolf Pelt, save it for bandages, or keep Medkit for dangerous routes.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function PeltTraderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/pelt-trader/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Pelt Trader', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const itemListSchema = buildItemListSchema({
    name: '99 Nights in the Forest Pelt Trader decisions',
    description:
      'Source-checked Pelt Trader, Wolf Pelt, Medkit, and Bandage route decisions.',
    items: ninetyNineNightsPeltTrader.facts.map((fact) => ({
      name: fact.title,
      url: `${pageUrl}#${fact.intent}`,
      description: fact.summary,
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
            <span className="text-foreground">Pelt Trader</span>
          </nav>

          <Badge variant="outline" className="mb-4 gap-1.5">
            <Store className="size-3.5" />
            Checked {ninetyNineNightsPeltTrader.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            99 Nights in the Forest Pelt Trader, Wolf Pelt, and Medkit guide
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            {ninetyNineNightsPeltTrader.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/bandages"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            >
              Open bandage route
            </Link>
            <Link
              href="/roblox/99-nights-in-the-forest/survival-guide"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Check survival guide
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Short answer</CardTitle>
            <CardDescription>
              Do not spend Wolf Pelt without a recovery plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm leading-6">
            <p>{ninetyNineNightsPeltTrader.sourceNote}</p>
            <p>
              If you searched for Pelt Trader, Medkit, and Wolf Pelt together,
              the useful decision is whether the run needs a trade reward or
              safer recovery more.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Shirt className="text-primary size-5" />
              <CardTitle>Wolf Pelt</CardTitle>
              <CardDescription>
                Trade material and recovery craft input.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <HeartPulse className="text-primary size-5" />
              <CardTitle>Medkit</CardTitle>
              <CardDescription>
                Strong recovery item, not a claim about trader rewards.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <ShieldCheck className="text-primary size-5" />
              <CardTitle>Route decision</CardTitle>
              <CardDescription>
                Trade surplus; save materials when revives matter.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Pelt Trader route decisions
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Pelt Trader, Medkit, and Wolf Pelt are connected route decisions.
              These sections keep confirmed facts separate from unconfirmed
              shortcuts so you can protect scarce recovery materials.
            </p>
          </div>

          <div className="grid gap-4">
            {ninetyNineNightsPeltTrader.facts.map((fact) => (
              <Card
                id={fact.intent}
                key={fact.title}
                className={intentStyles[fact.intent]}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{intentLabels[fact.intent]}</Badge>
                    <Badge variant={confidenceTone[fact.confidence]}>
                      {fact.confidence} confidence
                    </Badge>
                  </div>
                  <CardTitle>{fact.title}</CardTitle>
                  <CardDescription>{fact.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-3 md:grid-cols-3">
                    {fact.details.map((detail) => (
                      <div
                        key={detail}
                        className="bg-background rounded-md p-4"
                      >
                        <h3 className="text-sm font-semibold">Do</h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {fact.cautions.map((caution) => (
                      <div
                        key={caution}
                        className="bg-background/80 rounded-md border p-4"
                      >
                        <h3 className="text-sm font-semibold">Do not assume</h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {caution}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">Sources</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {fact.sources.map((source) => (
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
              <CardTitle>Related 99 Nights pages</CardTitle>
              <CardDescription>
                Pelt Trader decisions connect to recovery, crafting, and route
                risk.
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
                Short answers for common trader and recovery questions.
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
