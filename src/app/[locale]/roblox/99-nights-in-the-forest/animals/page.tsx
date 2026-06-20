import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsAnimals } from '@/data/99-nights-animals';
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

const fluteStyles = {
  'Old Flute': 'border-amber-500/40 bg-amber-500/10',
  'Good Flute': 'border-blue-500/40 bg-blue-500/10',
  'Strong Flute': 'border-emerald-500/40 bg-emerald-500/10',
};

const faqs = [
  {
    question:
      'How many tameable animals are listed for 99 Nights in the Forest?',
    answer:
      'The checked PC Gamer animal taming guide lists 11 tameable animals.',
  },
  {
    question: 'What is the easiest animal to tame first?',
    answer:
      'Bunny is the simplest first target in the checked data because it uses the Old Flute and has the lowest listed food requirement.',
  },
  {
    question: 'Which animals need the Strong Flute?',
    answer:
      'The checked data lists Bear, Polar Bear, Mammoth, and Hellephant as Strong Flute animals.',
  },
  {
    question: 'Which classes should I check for an animal-focused run?',
    answer:
      'Review Zookeeper and Beastmaster when planning a taming-focused run, then compare them against the general class tier list.',
  },
  {
    question: 'Is this an official animal list?',
    answer:
      "No. This is a fan-made reference based on checked source data and is not affiliated with Roblox or Grandma's Favourite Games.",
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
    '/roblox/99-nights-in-the-forest/animals/',
    locale
  );

  return {
    title: `99 Nights in the Forest Animals and Taming (${monthYear})`,
    description:
      'A checked 99 Nights in the Forest animal taming reference with flute requirements, food requirements, biome notes, and beginner targets.',
    keywords: seoKeywords.ninetyNineNightsAnimals,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `99 Nights in the Forest Animals and Taming (${monthYear})`,
      description:
        'Compare tameable animals, food requirements, and flute requirements before building an animal-focused run.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function AnimalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/animals/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const robloxUrl = canonicalUrl('/roblox/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Roblox', item: robloxUrl },
    { name: game.name, item: gameUrl },
    { name: 'Animals', item: pageUrl },
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

  const animalsByFlute = (
    ['Old Flute', 'Good Flute', 'Strong Flute'] as const
  ).map((flute) => ({
    flute,
    animals: ninetyNineNightsAnimals.animals.filter(
      (animal) => animal.flute === flute
    ),
  }));

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
            <Badge variant="secondary">Animals and taming</Badge>
            <Badge variant="outline">
              Checked {ninetyNineNightsAnimals.checkedAt}
            </Badge>
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              99 Nights in the Forest Animals and Taming
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg">
              Compare tameable animals by Flute requirement, food cost, biome
              note, and practical target order before planning an animal-focused
              run.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium shadow-xs"
              href="/roblox/99-nights-in-the-forest/classes"
            >
              Compare classes
            </Link>
            <Link
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium shadow-xs"
              href="/roblox/99-nights-in-the-forest/survival-guide"
            >
              Survival guide
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Source trail</CardTitle>
            <CardDescription>
              Food and Flute requirements are kept in typed data.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm">
            <p>
              Source: {ninetyNineNightsAnimals.source.name}, published{' '}
              {ninetyNineNightsAnimals.source.publishedAt}, checked{' '}
              {ninetyNineNightsAnimals.source.checkedAt}.
            </p>
            <a
              className="text-foreground inline-flex items-center gap-1 font-medium underline underline-offset-4"
              href={ninetyNineNightsAnimals.source.url}
              rel="noreferrer"
              target="_blank"
            >
              Open source
              <ExternalLink className="size-3.5" />
            </a>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Checked animals</CardDescription>
            <CardTitle>
              {ninetyNineNightsAnimals.summary.totalAnimals}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Best early targets</CardTitle>
            <CardDescription>
              Start with lower-requirement animals before planning expensive
              Strong Flute targets.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {ninetyNineNightsAnimals.summary.beginnerTargets.map((animal) => (
              <Badge key={animal} variant="outline">
                {animal}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Animals by Flute Requirement
          </h2>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Use Flute requirement as the first filter. The food list is the next
            planning constraint because several late targets need farming or
            fishing preparation.
          </p>
        </div>

        <div className="grid gap-4">
          {animalsByFlute.map((group) => (
            <Card className={fluteStyles[group.flute]} key={group.flute}>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>{group.flute}</Badge>
                  <CardTitle className="text-xl">
                    {group.animals.length} animal
                    {group.animals.length === 1 ? '' : 's'}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {group.animals.map((animal) => (
                    <div
                      className="bg-background/80 rounded-md border p-4"
                      key={animal.name}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{animal.name}</h3>
                          <p className="text-muted-foreground mt-1 text-xs">
                            {animal.biome}
                          </p>
                        </div>
                        <Badge variant="outline">{animal.flute}</Badge>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {animal.food.map((food) => (
                          <span
                            className="bg-muted rounded-md px-2 py-1 text-xs font-medium"
                            key={food}
                          >
                            {food}
                          </span>
                        ))}
                      </div>
                      <p className="text-muted-foreground mt-3 text-sm">
                        {animal.note}
                      </p>
                    </div>
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
            <CardTitle>How to plan a taming run</CardTitle>
            <CardDescription>
              Pick the animal after you know the Flute, biome, and food route.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm">
            <p>
              Start with Old Flute animals while learning the route. Move to
              Good Flute and Strong Flute targets only after camp safety,
              fishing, farming, and cooking supplies can support the food list.
            </p>
            <p>
              {ninetyNineNightsAnimals.summary.classNotes} Use the class tier
              list before spending diamonds on a taming-specific setup.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related pages</CardTitle>
            <CardDescription>
              Use animal data with survival and class planning.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/survival-guide"
            >
              Survival guide
            </Link>
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/class-tier-list"
            >
              Class tier list
            </Link>
            <Link
              className="hover:bg-accent block rounded-md border p-3"
              href="/roblox/99-nights-in-the-forest/codes"
            >
              Working codes and source history
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
