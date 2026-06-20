import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsForestGemFragments } from '@/data/99-nights-forest-gem-fragments';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import { Clock, ExternalLink, Gem, Moon, ShieldAlert } from 'lucide-react';

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
    question: 'How do I get Forest Gem fragments in 99 Nights in the Forest?',
    answer:
      'Fandom says Forest Gem fragments can be found by defeating cultists in nighttime raids after day 100.',
  },
  {
    question: 'How many Forest Gem fragments make a full Gem of the Forest?',
    answer:
      'The checked Fandom data says 4 Forest Gem fragments can be combined into 1 full Gem of the Forest.',
  },
  {
    question: 'Can I farm Forest Gem fragments before Day 100?',
    answer:
      'The checked fragment route is Day 100+ nighttime raid cultists, so this page treats fragments as a late-run objective.',
  },
  {
    question: 'What is the Forest Gem fragment drop rate?',
    answer:
      'Quest Codes does not publish a fragment drop rate because the checked source confirms the route but does not provide stable odds.',
  },
  {
    question: 'What should I do with the first full Forest Gem?',
    answer:
      'Compare Crafting Bench Level 5 and Tier 5 crafts first. Respawn Capsule is safer when deaths end the run; Bench 5 is flexible when you need options.',
  },
  {
    question: 'Is this site affiliated with Roblox?',
    answer:
      'No. Quest Codes is a fan-made source-checked guide site and is not affiliated with Roblox or the 99 Nights in the Forest developer.',
  },
];

const ruleLabels = {
  source: 'Source',
  combine: 'Combine rule',
  limit: 'No fake rates',
  spend: 'Spend plan',
} as const;

const stageLabels = {
  'before-day-100': 'Before Day 100',
  'day-100-raid': 'Day 100+ raid',
  combine: 'Combine',
  spend: 'Spend',
} as const;

const stageStyles = {
  'before-day-100': 'border-blue-500/40 bg-blue-500/10',
  'day-100-raid': 'border-purple-500/40 bg-purple-500/10',
  combine: 'border-emerald-500/40 bg-emerald-500/10',
  spend: 'border-amber-500/40 bg-amber-500/10',
} as const;

const confidenceTone = {
  high: 'default',
  medium: 'secondary',
} as const;

const relatedPages = [
  {
    href: '/roblox/99-nights-in-the-forest/gem-of-the-forest',
    title: 'Gem of the Forest',
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
    href: '/roblox/99-nights-in-the-forest/survival-guide',
    title: 'Survival guide',
  },
  {
    href: '/roblox/99-nights-in-the-forest/bandages',
    title: 'Bandage crafting route',
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
    '/roblox/99-nights-in-the-forest/forest-gem-fragments/',
    locale
  );

  return {
    title: `99 Nights in the Forest Forest Gem Fragments (${monthYear})`,
    description:
      'How to get Forest Gem fragments in 99 Nights in the Forest from Day 100+ nighttime raids, how 4 fragments combine, and when to spend the full gem.',
    keywords: seoKeywords.ninetyNineNightsForestGemFragments,
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Forest Gem Fragments (${monthYear})`,
      description:
        'Source-checked Forest Gem fragment route, combine rule, and first-spend decision.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function ForestGemFragmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/forest-gem-fragments/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Forest Gem Fragments', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const howToSchema = buildHowToSchema({
    name: 'How to plan Forest Gem fragments in 99 Nights in the Forest',
    description:
      'Use Day 100+ nighttime raids and the 4-fragment combine rule without inventing drop rates.',
    steps: [
      {
        name: 'Prepare before Day 100',
        text: 'Stabilize food, fuel, recovery, and camp safety before chasing late-run fragments.',
      },
      {
        name: 'Use Day 100+ nighttime raids',
        text: 'Treat cultists in nighttime raids after day 100 as the checked fragment route.',
      },
      {
        name: 'Track 4 fragments',
        text: 'Save fragments until 4 can be combined into 1 full Gem of the Forest.',
      },
      {
        name: 'Choose the first spend',
        text: 'Compare Crafting Bench Level 5 with Tier 5 crafts before spending the full gem.',
      },
    ],
  });
  const itemListSchema = buildItemListSchema({
    name: '99 Nights in the Forest Forest Gem fragment rules',
    description:
      'Source, combine rule, limitations, and spend plan for Forest Gem fragments.',
    items: ninetyNineNightsForestGemFragments.rules.map((rule) => ({
      name: rule.title,
      url: `${pageUrl}#${rule.type}`,
      description: rule.summary,
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
            <span className="text-foreground">Forest Gem Fragments</span>
          </nav>

          <Badge variant="outline" className="mb-4 gap-1.5">
            <Gem className="size-3.5" />
            Checked {ninetyNineNightsForestGemFragments.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            99 Nights in the Forest Forest Gem fragments
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            {ninetyNineNightsForestGemFragments.summary} This page is narrow on
            purpose: it explains the fragment route without pretending to know
            hidden drop rates.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/gem-of-the-forest"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            >
              Open Forest Gem guide
            </Link>
            <Link
              href="/roblox/99-nights-in-the-forest/crafting-bench-5"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Compare Bench 5
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Short answer</CardTitle>
            <CardDescription>
              Four fragments make one full Forest Gem.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm leading-6">
            <p>{ninetyNineNightsForestGemFragments.sourceNote}</p>
            <p>
              Treat fragments as late-run progress. The page intentionally
              separates confirmed facts from unverified farming claims.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <Moon className="text-primary size-5" />
              <CardTitle>Day 100+</CardTitle>
              <CardDescription>
                Nighttime raid cultists are the checked fragment route.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Gem className="text-primary size-5" />
              <CardTitle>4 fragments</CardTitle>
              <CardDescription>
                Combine into one full Gem of the Forest.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <ShieldAlert className="text-primary size-5" />
              <CardTitle>No drop rates</CardTitle>
              <CardDescription>
                Route confirmed, odds not confirmed.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Clock className="text-primary size-5" />
              <CardTitle>Spend later</CardTitle>
              <CardDescription>
                Compare Bench 5 and Tier 5 crafts first.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Forest Gem fragment rules
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              These are the checked facts worth indexing. The page avoids fake
              probability tables because fragment odds can change and are not
              stable in the checked source.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {ninetyNineNightsForestGemFragments.rules.map((rule) => (
              <Card id={rule.type} key={rule.title}>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{ruleLabels[rule.type]}</Badge>
                    <Badge variant={confidenceTone[rule.confidence]}>
                      {rule.confidence} confidence
                    </Badge>
                  </div>
                  <CardTitle>{rule.title}</CardTitle>
                  <CardDescription>{rule.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {rule.details.map((detail) => (
                      <p
                        key={detail}
                        className="text-muted-foreground rounded-md border p-3 text-sm leading-6"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {rule.sources.map((source) => (
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
              Fragment route plan
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Read this as a route decision, not as a guaranteed farm loop. The
              goal is to avoid wasting a late run on a weak setup.
            </p>
          </div>

          <div className="grid gap-4">
            {ninetyNineNightsForestGemFragments.steps.map((step) => (
              <Card
                id={step.stage}
                key={step.title}
                className={stageStyles[step.stage]}
              >
                <CardHeader>
                  <Badge>{stageLabels[step.stage]}</Badge>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-3 md:grid-cols-3">
                    {step.do.map((item) => (
                      <div
                        key={item}
                        className="bg-background/80 rounded-md border p-4"
                      >
                        <h3 className="text-sm font-semibold">Do this</h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {step.avoid.map((item) => (
                      <div key={item} className="bg-background rounded-md p-4">
                        <h3 className="flex items-center gap-2 text-sm font-semibold">
                          <ShieldAlert className="size-4" />
                          Avoid
                        </h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {item}
                        </p>
                      </div>
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
                Fragment planning connects to Forest Gem, Stronghold, and
                recovery pages.
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
                Short answers for Forest Gem fragment searches.
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
