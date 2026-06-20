import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsZookeeperBeastmaster } from '@/data/99-nights-zookeeper-beastmaster';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  PawPrint,
  Scale,
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
    question: 'Is Zookeeper or Beastmaster better in 99 Nights in the Forest?',
    answer:
      'Beastmaster is the stronger taming-first pick when you can afford it and plan to build around animals. Zookeeper is cheaper and useful for learning taming routes, but source signals disagree on its broad value.',
  },
  {
    question: 'Is Zookeeper worth buying?',
    answer:
      'Zookeeper is worth considering if you specifically want a lower-cost animal-focused class. It is not the safest universal pick if you mostly need solo survival or direct combat.',
  },
  {
    question: 'Is Beastmaster worth 400 diamonds?',
    answer:
      'Beastmaster can be worth the high cost if pets are central to your route. If you are not actively using the Taming Flute and animal food planning, save for a broader class first.',
  },
  {
    question: 'Why do class tier lists disagree?',
    answer:
      'Some tier lists reward general survival and combat consistency, while others reward the ceiling of animal-focused routes. Quest Codes labels source disagreement instead of hiding it.',
  },
  {
    question: 'Should beginners choose a taming class first?',
    answer:
      'Usually no. Beginners should learn camp setup, food routes, night survival, and basic classes before spending heavily on a specialist taming class.',
  },
  {
    question: 'Is this an official Roblox recommendation?',
    answer:
      "No. Quest Codes is a fan-made guide site and is not affiliated with Roblox or Grandma's Favourite Games.",
  },
];

const classTone = {
  Zookeeper: 'border-amber-500/40 bg-amber-500/10',
  Beastmaster: 'border-emerald-500/40 bg-emerald-500/10',
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl(
    '/roblox/99-nights-in-the-forest/zookeeper-vs-beastmaster/',
    locale
  );

  return {
    title: `Zookeeper vs Beastmaster 99 Nights (${monthYear})`,
    description:
      'Zookeeper vs Beastmaster in 99 Nights in the Forest with source-checked class roles, flute starts, pet-limit notes, diamond cost caveats, and verdict.',
    keywords: seoKeywords.ninetyNineNightsZookeeperBeastmaster,
    alternates: { canonical },
    openGraph: {
      title: `Zookeeper vs Beastmaster 99 Nights (${monthYear})`,
      description:
        'Compare Zookeeper and Beastmaster before spending diamonds on an animal-focused class route.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function ZookeeperVsBeastmasterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/zookeeper-vs-beastmaster/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Zookeeper vs Beastmaster', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const itemListSchema = buildItemListSchema({
    name: 'Zookeeper vs Beastmaster comparison',
    description:
      'Source-checked comparison of taming-focused classes in 99 Nights in the Forest.',
    items: ninetyNineNightsZookeeperBeastmaster.classes.map((classData) => ({
      name: classData.name,
      url: `${pageUrl}#${classData.name.toLowerCase()}`,
      description: classData.role,
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

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_330px] lg:px-8">
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
            <span className="text-foreground">Zookeeper vs Beastmaster</span>
          </nav>

          <Badge variant="outline" className="mb-4 gap-1.5">
            <Scale className="size-3.5" />
            Checked {ninetyNineNightsZookeeperBeastmaster.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            Zookeeper vs Beastmaster in 99 Nights in the Forest
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            {ninetyNineNightsZookeeperBeastmaster.verdict}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/taming-flute"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium"
            >
              Check Taming Flute route
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/roblox/99-nights-in-the-forest/class-tier-list"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Compare tier list
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Short verdict</CardTitle>
            <CardDescription>
              Pick the class based on how committed you are to taming.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm leading-6">
            <p>
              Beastmaster is the better animal-ceiling pick. Zookeeper is the
              cheaper learning pick. Neither should be treated as the safest
              general beginner class.
            </p>
            <p>
              The important part is not only the class. You also need food,
              flute XP, pet-limit planning, and a route that can protect pets.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {ninetyNineNightsZookeeperBeastmaster.decisions.map((decision) => (
            <Card key={decision.title}>
              <CardHeader>
                <PawPrint className="text-primary size-5" />
                <CardTitle>{decision.title}</CardTitle>
                <CardDescription>{decision.summary}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Class-by-class comparison
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              These are source-checked planning notes, not hidden formulas. Use
              them with the Taming Flute and animal pages before spending
              diamonds.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {ninetyNineNightsZookeeperBeastmaster.classes.map((classData) => (
              <Card
                id={classData.name.toLowerCase()}
                key={classData.name}
                className={classTone[classData.name]}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{classData.name}</Badge>
                    <Badge variant="outline">{classData.unlockCost}</Badge>
                  </div>
                  <CardTitle>{classData.role}</CardTitle>
                  <CardDescription>
                    {classData.startingFlute}. {classData.petLimit}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 text-sm">
                  <div>
                    <h3 className="font-semibold">Strengths</h3>
                    <ul className="text-muted-foreground mt-3 grid gap-2">
                      {classData.strengths.map((item) => (
                        <li key={item} className="rounded-md border p-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Weaknesses</h3>
                    <ul className="text-muted-foreground mt-3 grid gap-2">
                      {classData.weaknesses.map((item) => (
                        <li key={item} className="rounded-md border p-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Best for</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {classData.bestFor.map((item) => (
                        <Badge key={item} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Source notes</h3>
                    <ul className="text-muted-foreground mt-3 grid gap-2">
                      {classData.sourceNotes.map((item) => (
                        <li
                          key={item}
                          className="bg-background/80 rounded-md p-3"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-primary size-5" />
                <CardTitle>Why the answer is not absolute</CardTitle>
              </div>
              <CardDescription>
                Taming classes depend heavily on route execution.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              {ninetyNineNightsZookeeperBeastmaster.caveats.map((caution) => (
                <div key={caution} className="rounded-md border p-4">
                  <p className="text-muted-foreground leading-6">{caution}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sources and next pages</CardTitle>
              <CardDescription>
                Follow the source trail, then plan the actual taming route.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 text-sm">
              <div>
                <h3 className="font-semibold">Source trail</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ninetyNineNightsZookeeperBeastmaster.sources.map(
                    (source) => (
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
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Related pages</h3>
                <div className="mt-3 grid gap-3">
                  <Link
                    href="/roblox/99-nights-in-the-forest/taming-flute"
                    className="hover:bg-accent rounded-md border p-3"
                  >
                    Taming Flute upgrade guide
                  </Link>
                  <Link
                    href="/roblox/99-nights-in-the-forest/animals"
                    className="hover:bg-accent rounded-md border p-3"
                  >
                    Animals and food requirements
                  </Link>
                  <Link
                    href="/roblox/99-nights-in-the-forest/classes"
                    className="hover:bg-accent rounded-md border p-3"
                  >
                    Full class reference
                  </Link>
                  <Link
                    href="/roblox/99-nights-in-the-forest/survival-guide"
                    className="hover:bg-accent rounded-md border p-3"
                  >
                    Survival guide
                  </Link>
                </div>
              </div>
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
