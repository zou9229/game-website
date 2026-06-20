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
    question: 'What is the best class in 99 Nights in the Forest?',
    answer:
      'The checked PC Gamer tier grouping places Big Game Hunter, Cyborg, Necromancer, and Vampire in the top S-tier group.',
  },
  {
    question: 'What is the best class for solo runs?',
    answer:
      'Cyborg is the safest all-around solo target from the checked guide, while Big Game Hunter and Necromancer are stronger late-run goals.',
  },
  {
    question: 'What is the best beginner class?',
    answer:
      'Scavenger, Lumberjack, Explorer, and Alien are better early unlock paths before saving diamonds for expensive top-tier classes.',
  },
  {
    question: 'Should I use a support class in co-op?',
    answer:
      'Yes. Lumberjack, Chef, Blacksmith, and Base Defender can help team runs by reducing resource pressure and improving camp stability.',
  },
  {
    question: 'Is this an official 99 Nights in the Forest tier list?',
    answer:
      "No. This is a fan-made tier list based on checked guide data and is not affiliated with Roblox or Grandma's Favourite Games.",
  },
];

const tierStyles: Record<string, string> = {
  S: 'border-emerald-500/50 bg-emerald-500/10',
  A: 'border-blue-500/40 bg-blue-500/10',
  B: 'border-amber-500/40 bg-amber-500/10',
  C: 'border-slate-500/30 bg-slate-500/10',
  D: 'border-red-500/30 bg-red-500/10',
  Event: 'border-purple-500/30 bg-purple-500/10',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl(
    '/roblox/99-nights-in-the-forest/class-tier-list/',
    locale
  );

  return {
    title: `99 Nights in the Forest Class Tier List (${monthYear})`,
    description:
      'A checked 99 Nights in the Forest class tier list for solo runs, co-op support, starter unlocks, and late-game diamond targets.',
    keywords: seoKeywords.ninetyNineNightsTierList,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `99 Nights in the Forest Class Tier List (${monthYear})`,
      description:
        'Compare the best 99 Nights in the Forest classes before spending diamonds.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function ClassTierListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/class-tier-list/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const classesUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/classes/',
    locale
  );
  const robloxUrl = canonicalUrl('/roblox/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Roblox', item: robloxUrl },
    { name: game.name, item: gameUrl },
    { name: 'Class Tier List', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const videoGameSchema = buildVideoGameSchema({
    name: game.name,
    description: game.description,
    url: game.robloxUrl,
    imageUrl: game.imageUrl,
    developer: game.developer,
    genre: game.genre,
    dateModified: game.updatedAt,
  });

  const topTier = ninetyNineNightsClasses.tiers.find(
    (tier) => tier.tier === 'S'
  );

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
            <Badge variant="secondary">Class tier list</Badge>
            <Badge variant="outline">
              Checked {ninetyNineNightsClasses.checkedAt}
            </Badge>
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              99 Nights in the Forest Class Tier List
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg">
              Pick your next diamond unlock with a source-backed class ranking
              for solo runs, team support, starter progression, and late-game
              survival.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium shadow-xs"
              href="/roblox/99-nights-in-the-forest/classes"
            >
              View all classes
            </Link>
            <Link
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium shadow-xs"
              href="/roblox/99-nights-in-the-forest/codes"
            >
              Check codes
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Best classes</CardTitle>
            <CardDescription>
              Top group from the checked class guide.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {topTier?.classes.map((className) => (
                <Badge key={className}>{className}</Badge>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Source: {ninetyNineNightsClasses.source.name}. This page does not
              invent class stats, diamond costs, or hidden perks.
            </p>
            <a
              className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4"
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

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Full Tier List
          </h2>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Use S-tier as long-term diamond targets. Use A-tier and B-tier as
            practical unlocks when you need a specific role for your team or
            route.
          </p>
        </div>
        <div className="grid gap-4">
          {ninetyNineNightsClasses.tiers.map((tier) => (
            <Card
              className={tierStyles[tier.tier] || 'border-border'}
              key={tier.tier}
            >
              <CardHeader>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>{tier.label}</Badge>
                  <CardTitle className="text-xl">{tier.summary}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {tier.classes.map((className) => (
                    <div
                      className="bg-background/80 rounded-md border p-3"
                      key={className}
                    >
                      <div className="font-medium">{className}</div>
                      <div className="text-muted-foreground mt-1 text-xs">
                        {tier.label}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>How to read this tier list</CardTitle>
            <CardDescription>
              Treat the tiers as a route-planning tool, not as official patch
              notes.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm">
            <p>
              If you are still learning the game, the best class is not always
              the most expensive one. Start with a class that helps you gather
              resources, survive nights, or support a team reliably.
            </p>
            <p>
              Once you understand camp priorities and enemy pressure, save
              diamonds for the S-tier group or the A-tier class that fits your
              preferred route.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related pages</CardTitle>
            <CardDescription>
              Keep classes, codes, animals, and survival planning together.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/classes"
            >
              All classes reference
            </Link>
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/codes"
            >
              Working codes and source history
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
              href="/roblox/99-nights-in-the-forest"
            >
              99 Nights game hub
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
