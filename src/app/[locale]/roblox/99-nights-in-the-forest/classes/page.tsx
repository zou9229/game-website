import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsClasses } from '@/data/99-nights-classes';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import { ExternalLink } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
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
    question: 'What are the best 99 Nights in the Forest classes?',
    answer:
      'Based on the checked PC Gamer class guide, Big Game Hunter, Cyborg, Necromancer, and Vampire sit in the top class group.',
  },
  {
    question: 'What class should beginners unlock first?',
    answer:
      'PC Gamer recommends learning with cheaper picks such as Scavenger, Lumberjack, Explorer, or Alien before saving for expensive late-run classes.',
  },
  {
    question: 'Is Cyborg worth saving for?',
    answer:
      'Yes. PC Gamer calls Cyborg one of the safest long-term targets because it supports many play styles once unlocked.',
  },
  {
    question: 'Are event classes always available?',
    answer:
      "No. Santa's Helper and Trick or Treater are event classes, so availability can depend on seasonal events.",
  },
  {
    question: 'Is this class list official?',
    answer:
      "No. This is a fan-made reference that summarizes checked guide data and is not affiliated with Roblox or Grandma's Favourite Games.",
  },
];

function tierTone(tier: string) {
  if (tier === 'S') return 'border-emerald-500/40 bg-emerald-500/10';
  if (tier === 'A') return 'border-blue-500/40 bg-blue-500/10';
  if (tier === 'B') return 'border-amber-500/40 bg-amber-500/10';
  if (tier === 'C') return 'border-slate-500/30 bg-slate-500/10';
  if (tier === 'D') return 'border-red-500/30 bg-red-500/10';
  return 'border-purple-500/30 bg-purple-500/10';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl(
    '/roblox/99-nights-in-the-forest/classes/',
    locale
  );

  return {
    title: `All 99 Nights in the Forest Classes List (${monthYear})`,
    description:
      'All 99 Nights in the Forest Roblox classes in one checked list, with tier groups, starter picks, solo recommendations, and co-op choices.',
    keywords: seoKeywords.ninetyNineNightsClasses,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title: `All 99 Nights in the Forest Classes List (${monthYear})`,
      description:
        'Compare 99 Nights in the Forest classes by tier and pick your next diamond unlock.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function ClassesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/classes/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const robloxUrl = canonicalUrl('/roblox/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Roblox', item: robloxUrl },
    { name: game.name, item: gameUrl },
    { name: 'Classes', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const allClasses = ninetyNineNightsClasses.tiers
    .flatMap((tier) =>
      tier.classes.map((className) => ({
        className,
        tier: tier.label,
      }))
    )
    .sort((a, b) => a.className.localeCompare(b.className));
  const videoGameSchema = buildVideoGameSchema({
    name: game.name,
    description: game.description,
    url: game.robloxUrl,
    imageUrl: game.imageUrl,
    developer: game.developer,
    genre: game.genre,
    dateModified: game.updatedAt,
  });

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoGameSchema),
        }}
      />

      <section className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Roblox classes</Badge>
            <Badge variant="outline">
              Checked {ninetyNineNightsClasses.checkedAt}
            </Badge>
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              All 99 Nights in the Forest Classes List
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg">
              Browse every class name in our checked Roblox classes list, then
              compare tier groups, starter choices, solo targets, and co-op
              support picks before spending diamonds.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium shadow-xs"
              href="/roblox/99-nights-in-the-forest/codes"
            >
              Check codes
            </Link>
            <Link
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium shadow-xs"
              href="/roblox/99-nights-in-the-forest"
            >
              Game hub
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Source trail</CardTitle>
            <CardDescription>
              Class tiers are kept separate from invented values.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm">
            <p>
              Source: {ninetyNineNightsClasses.source.name}, last updated{' '}
              {ninetyNineNightsClasses.source.lastUpdated}.
            </p>
            <a
              className="text-foreground inline-flex items-center gap-1 font-medium underline underline-offset-4"
              href={ninetyNineNightsClasses.source.url}
              rel="noreferrer"
              target="_blank"
            >
              Open source
              <ExternalLink className="size-3.5" />
            </a>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {ninetyNineNightsClasses.recommendations.map((recommendation) => (
          <Card key={recommendation.title}>
            <CardHeader>
              <CardTitle className="text-lg">{recommendation.title}</CardTitle>
              <CardDescription>{recommendation.note}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {recommendation.classes.map((className) => (
                  <Badge key={className} variant="outline">
                    {className}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            All classes in 99 Nights in the Forest
          </h2>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            This alphabetical list contains {allClasses.length} class names from
            the source-checked class groups dated{' '}
            {ninetyNineNightsClasses.checkedAt}. Tier labels summarize the cited
            guide and are not official Roblox balance notes.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allClasses.map(({ className, tier }) => (
            <Card key={className}>
              <CardContent className="flex items-center justify-between gap-3 py-4">
                <span className="font-medium">{className}</span>
                <Badge variant="outline">{tier}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Class Tier Groups
          </h2>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            These groups summarize a checked guide source. Treat them as a
            practical unlock map, not as official balance notes.
          </p>
        </div>

        <div className="grid gap-4">
          {ninetyNineNightsClasses.tiers.map((tier) => (
            <Card className={tierTone(tier.tier)} key={tier.tier}>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>{tier.label}</Badge>
                  <CardTitle className="text-xl">{tier.summary}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tier.classes.map((className) => (
                    <span
                      className="bg-background/80 rounded-md border px-3 py-1 text-sm font-medium"
                      key={className}
                    >
                      {className}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>What to unlock first</CardTitle>
            <CardDescription>
              New players should avoid spending all diamonds on a narrow role
              before learning the game loop.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm">
            <p>
              Start with a cheaper, broad-use class if you are still learning
              camp setup, looting routes, and night survival. Then save for a
              top-tier target once you know whether you prefer solo runs or team
              support.
            </p>
            <p>
              Cyborg is the cleanest long-term target from the checked guide.
              Big Game Hunter and Necromancer are stronger late-run options, but
              they make more sense after you understand the game loop.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next pages</CardTitle>
            <CardDescription>
              Use the class list with the routes and decisions it affects.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/class-tier-list"
            >
              Class tier list
            </Link>
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/survival-guide"
            >
              Survival guide
            </Link>
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/animals"
            >
              Animals and taming
            </Link>
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/taming-flute"
            >
              Taming Flute upgrade route
            </Link>
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/zookeeper-vs-beastmaster"
            >
              Zookeeper vs Beastmaster
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <CardHeader>
                <CardTitle className="text-base">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                {faq.answer}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
