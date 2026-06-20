import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsAnimals } from '@/data/99-nights-animals';
import { ninetyNineNightsTamingFlute } from '@/data/99-nights-taming-flute';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  AlertTriangle,
  ArrowUpCircle,
  ExternalLink,
  Music2,
  PawPrint,
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

const tierStyles = {
  'Old Flute': 'border-amber-500/40 bg-amber-500/10',
  'Good Flute': 'border-blue-500/40 bg-blue-500/10',
  'Strong Flute': 'border-emerald-500/40 bg-emerald-500/10',
} as const;

const faqs = [
  {
    question: 'How do I get the Taming Flute in 99 Nights in the Forest?',
    answer:
      'Checked sources list routes through the animal shelter, Pelt Trader, and taming-focused classes. Most non-taming classes should treat the shelter route as the clean first check.',
  },
  {
    question: 'How do I upgrade the Taming Flute?',
    answer:
      'Build flute XP through taming and pet care, then use the Taming Flute bench in the Upgrade Station / Skills Building when the XP bar is ready.',
  },
  {
    question: 'What are the Taming Flute tiers?',
    answer:
      'The checked tiers are Old Taming Flute, Good Taming Flute, and Strong Taming Flute.',
  },
  {
    question: 'Which animals need the Strong Flute?',
    answer:
      'The checked animal data lists Bear, Polar Bear, Mammoth, and Hellephant as Strong Flute animals.',
  },
  {
    question: 'Does the Taming Flute page list exact upgrade costs?',
    answer:
      'No. The checked sources explain XP and upgrade bench flow, but do not provide a stable universal cost table. Quest Codes avoids publishing unsourced upgrade costs.',
  },
  {
    question: 'Is this an official Roblox page?',
    answer:
      "No. Quest Codes is a fan-made guide site and is not affiliated with Roblox or Grandma's Favourite Games.",
  },
];

const relatedPages = [
  {
    href: '/roblox/99-nights-in-the-forest/animals',
    title: 'Animals and food requirements',
  },
  {
    href: '/roblox/99-nights-in-the-forest/classes',
    title: 'Classes reference',
  },
  {
    href: '/roblox/99-nights-in-the-forest/class-tier-list',
    title: 'Class tier list',
  },
  {
    href: '/roblox/99-nights-in-the-forest/survival-guide',
    title: 'Survival guide',
  },
  {
    href: '/roblox/99-nights-in-the-forest/crafting',
    title: 'Crafting guide',
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
    '/roblox/99-nights-in-the-forest/taming-flute/',
    locale
  );

  return {
    title: `99 Nights in the Forest Taming Flute Guide (${monthYear})`,
    description:
      'How to get and upgrade the Taming Flute in 99 Nights in the Forest, with Old, Good, and Strong Flute tiers, XP route, and animal planning notes.',
    keywords: seoKeywords.ninetyNineNightsTamingFlute,
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Taming Flute Guide (${monthYear})`,
      description:
        'Get the Taming Flute, build flute XP, upgrade it at the Skills Building, and plan animals by Old, Good, and Strong Flute tiers.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function TamingFlutePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/taming-flute/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Taming Flute', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const howToSchema = buildHowToSchema({
    name: 'How to upgrade the Taming Flute in 99 Nights in the Forest',
    description:
      'Get the first flute, build XP through taming and pet care, then upgrade at the Taming Flute bench in the Skills Building.',
    steps: ninetyNineNightsTamingFlute.upgradeSteps.map((step) => ({
      name: step.title,
      text: `${step.summary} ${step.detail}`,
    })),
  });
  const itemListSchema = buildItemListSchema({
    name: '99 Nights in the Forest Taming Flute tiers',
    description:
      'Old, Good, and Strong Taming Flute tiers with checked animal planning notes.',
    items: ninetyNineNightsTamingFlute.tiers.map((tier) => ({
      name: tier.name,
      url: `${pageUrl}#${tier.shortName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      description: tier.planningNote,
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
            <span className="text-foreground">Taming Flute</span>
          </nav>

          <Badge variant="outline" className="mb-4 gap-1.5">
            <Music2 className="size-3.5" />
            Checked {ninetyNineNightsTamingFlute.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            99 Nights in the Forest Taming Flute guide
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            {ninetyNineNightsTamingFlute.summary} Use this as the practical
            route before deciding whether to buy Zookeeper, Beastmaster, or a
            general survival class.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/animals"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            >
              Check animal list
            </Link>
            <Link
              href="/roblox/99-nights-in-the-forest/class-tier-list"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Compare classes
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Short answer</CardTitle>
            <CardDescription>
              Upgrade flow without fake cost claims.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm leading-6">
            <p>
              Get a first flute, tame or care for pets to build XP, then use the
              Taming Flute bench inside the Upgrade Station / Skills Building.
            </p>
            <p>
              Exact universal upgrade costs are not listed here because the
              checked sources do not provide a stable cost table.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Music2 className="text-primary size-5" />
              <CardTitle>3 flute tiers</CardTitle>
              <CardDescription>
                Old, Good, and Strong Taming Flute paths.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <PawPrint className="text-primary size-5" />
              <CardTitle>Animal planning</CardTitle>
              <CardDescription>
                Use food requirements before picking targets.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <ArrowUpCircle className="text-primary size-5" />
              <CardTitle>XP-based upgrades</CardTitle>
              <CardDescription>
                Build flute XP, then upgrade at the bench.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              How to get the Taming Flute
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Pick the route that matches your class and map progress. The
              shelter route is usually the cleanest first check for general
              classes.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {ninetyNineNightsTamingFlute.obtainment.map((step) => (
              <Card key={step.title}>
                <CardHeader>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.summary}</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm leading-6">
                  {step.detail}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              How to upgrade the Taming Flute
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              The upgrade path is a progression loop: get flute, tame animals,
              care for pets, then upgrade at the dedicated bench.
            </p>
          </div>

          <div className="grid gap-4">
            {ninetyNineNightsTamingFlute.upgradeSteps.map((step, index) => (
              <Card key={step.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge>{index + 1}</Badge>
                    <CardTitle>{step.title}</CardTitle>
                  </div>
                  <CardDescription>{step.summary}</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm leading-6">
                  {step.detail}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Old, Good, and Strong Flute animals
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Treat the flute tier as the gate, then use the animal page for the
              food list before committing to a long taming route.
            </p>
          </div>

          <div className="grid gap-4">
            {ninetyNineNightsTamingFlute.tiers.map((tier) => (
              <Card
                id={tier.shortName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                key={tier.name}
                className={tierStyles[tier.shortName]}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{tier.shortName}</Badge>
                    <CardTitle>{tier.name}</CardTitle>
                  </div>
                  <CardDescription>{tier.planningNote}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {tier.unlocks.map((animal) => {
                    const animalData = ninetyNineNightsAnimals.animals.find(
                      (item) => item.name === animal
                    );
                    return (
                      <div
                        className="bg-background/80 rounded-md border p-4"
                        key={animal}
                      >
                        <h3 className="font-semibold">{animal}</h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {animalData
                            ? `${animalData.food.join(', ')}. ${animalData.note}`
                            : 'Check the animal guide before planning food.'}
                        </p>
                      </div>
                    );
                  })}
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
                <CardTitle>Planning cautions</CardTitle>
              </div>
              <CardDescription>
                These are the parts most likely to waste a run.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              {ninetyNineNightsTamingFlute.cautions.map((caution) => (
                <div key={caution.title} className="rounded-md border p-4">
                  <h3 className="font-semibold">{caution.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-6">
                    {caution.summary}
                  </p>
                  <p className="text-muted-foreground mt-2 leading-6">
                    {caution.detail}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sources and related pages</CardTitle>
              <CardDescription>
                Use source trails for claims, and internal pages for route
                planning.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 text-sm">
              <div>
                <h3 className="font-semibold">Source trail</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ninetyNineNightsTamingFlute.sources.map((source) => (
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

              <div>
                <h3 className="font-semibold">Related pages</h3>
                <div className="mt-3 grid gap-3">
                  {relatedPages.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="hover:bg-accent rounded-md border p-3"
                    >
                      {item.title}
                    </Link>
                  ))}
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
