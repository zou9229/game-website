import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsAssassin } from '@/data/99-nights-assassin';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  Diamond,
  ExternalLink,
  Footprints,
  HeartPulse,
  Route,
  ShieldAlert,
  Swords,
  Target,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildHowToSchema,
  buildItemListSchema,
  buildVideoGameSchema,
  canonicalUrl,
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

const unlockSteps = [
  {
    name: 'Save 500 diamonds',
    text: 'Assassin is listed at 500 diamonds, so keep that amount available before checking the class shop.',
  },
  {
    name: 'Open the class shop',
    text: 'Use the Classes control or visit the class shop in the Roblox game lobby.',
  },
  {
    name: 'Check the rotating stock',
    text: 'Assassin belongs to the active class pool but may not appear in the current rotation. Check the live shop before spending.',
  },
  {
    name: 'Purchase and equip Assassin',
    text: 'Buy the class when it appears, then equip it before starting a run to receive its starter tools and Level 1 perks.',
  },
];

const faqs = [
  {
    question: 'How much does the Assassin class cost?',
    answer:
      'The checked source lists Assassin at 500 diamonds. It is part of the active rotating class pool, so the live shop is the final availability check.',
  },
  {
    question: 'What does Assassin start with?',
    answer:
      'Assassin starts with a Katana and 120 Throwing Knives, which are called Kunai in the player inventory.',
  },
  {
    question: 'What are the Assassin Level 1 perks?',
    answer:
      'The July 11 source revision lists 10% more sprint speed, 15% lower maximum health, and a 5% chance for Throwing Knives to appear in chests.',
  },
  {
    question: 'How do I reach Assassin Level 2?',
    answer:
      'Defeat 100 enemies without taking damage and travel 2,500 studs. Level 2 adds a chance for the first hit on an enemy to critically strike.',
  },
  {
    question: 'How do I reach Assassin Level 3?',
    answer:
      'Defeat 250 enemies without taking damage and travel 10,000 studs. Level 3 adds another listed Throwing Knife chest chance.',
  },
  {
    question: 'Is Assassin the best class in 99 Nights in the Forest?',
    answer:
      'There is no single source-confirmed best class for every route. Assassin offers speed and an immediate combat kit, but it costs 500 diamonds and reduces maximum health by 15%.',
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = canonicalUrl(
    '/roblox/99-nights-in-the-forest/classes/assassin/',
    locale
  );
  const title = `99 Nights in the Forest Assassin Class Guide`;
  const description =
    'How to get the Assassin class in 99 Nights in the Forest, with its 500-diamond cost, Katana, Throwing Knives, perks, level requirements, and tradeoffs.';

  return {
    title,
    description,
    keywords: seoKeywords.ninetyNineNightsAssassin,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function AssassinClassPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/classes/assassin/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const classesUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/classes/',
    locale
  );
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Classes', item: classesUrl },
    { name: 'Assassin', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const howToSchema = buildHowToSchema({
    name: 'How to get the Assassin class in 99 Nights in the Forest',
    description:
      'Save the listed price, check the rotating class stock, and equip Assassin before a run.',
    steps: unlockSteps,
  });
  const progressionSchema = buildItemListSchema({
    name: '99 Nights in the Forest Assassin class levels',
    description:
      'Source-checked Assassin perks and requirements from Level 1 through Level 3.',
    items: ninetyNineNightsAssassin.levelProgression.map((level) => ({
      name: `Assassin Level ${level.level}: ${level.title}`,
      url: `${pageUrl}#level-${level.level}`,
      description: [...level.perks, ...level.requirements].join('. '),
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
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8">
      {[
        breadcrumbSchema,
        faqSchema,
        howToSchema,
        progressionSchema,
        videoGameSchema,
      ].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Active rotating class</Badge>
            <Badge variant="outline">
              Checked {ninetyNineNightsAssassin.checkedAt}
            </Badge>
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              Assassin Class in 99 Nights in the Forest
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg leading-8">
              Assassin is a 500-diamond class built around faster movement, a
              Katana, and a large starting supply of Throwing Knives. Its
              immediate combat kit comes with lower maximum health and no-damage
              requirements for later levels.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center gap-1.5 rounded-md px-4 text-sm font-medium"
              href={game.robloxUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Check live class stock
              <ExternalLink className="size-3.5" />
            </a>
            <Link
              className="border-input bg-background hover:bg-accent inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
              href="/roblox/99-nights-in-the-forest/classes"
            >
              Compare all classes
            </Link>
          </div>
        </div>

        <Card className="overflow-hidden">
          <img
            alt="99 Nights in the Forest Roblox game thumbnail"
            className="aspect-video w-full object-cover"
            src={game.imageUrl}
          />
          <CardContent className="grid grid-cols-2 gap-3 pt-5">
            {[
              ['Cost', `${ninetyNineNightsAssassin.price} diamonds`],
              ['Status', ninetyNineNightsAssassin.availability],
              ['Starter tools', '2 types'],
              ['Level cap', 'Level 3'],
            ].map(([label, value]) => (
              <div className="bg-muted/50 rounded-md p-3" key={label}>
                <p className="text-muted-foreground text-xs">{label}</p>
                <p className="mt-1 text-sm font-semibold">{value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            How to unlock Assassin
          </h2>
          <p className="text-muted-foreground mt-2 max-w-3xl leading-7">
            Being in the active pool does not guarantee that Assassin is
            purchasable in the current shop rotation.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {unlockSteps.map((step, index) => (
            <Card key={step.name}>
              <CardHeader>
                <Badge className="w-fit">{index + 1}</Badge>
                <CardTitle className="text-base">{step.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm leading-6">
                {step.text}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <Swords className="text-primary size-5" />
            <CardTitle>Starter loadout</CardTitle>
            <CardDescription>
              Equipped automatically when the run starts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ninetyNineNightsAssassin.starterTools.map((tool) => (
              <div
                className="bg-muted/45 flex items-center gap-3 rounded-md p-3 text-sm font-medium"
                key={tool}
              >
                <Target className="text-primary size-4 shrink-0" />
                {tool}
              </div>
            ))}
            <p className="text-muted-foreground text-sm leading-6">
              The source calls them Throwing Knives in class selection and Kunai
              in the player inventory.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {ninetyNineNightsAssassin.levelProgression.map((level) => (
            <Card id={`level-${level.level}`} key={level.level}>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline">Level {level.level}</Badge>
                  <CardTitle className="text-lg">{level.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-semibold">Perks</p>
                  <ul className="text-muted-foreground space-y-2 text-sm leading-6">
                    {level.perks.map((perk) => (
                      <li className="flex gap-2" key={perk}>
                        <Footprints className="text-primary mt-1 size-3.5 shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold">Requirements</p>
                  {level.requirements.length ? (
                    <ul className="text-muted-foreground space-y-2 text-sm leading-6">
                      {level.requirements.map((requirement) => (
                        <li className="flex gap-2" key={requirement}>
                          <Target className="text-primary mt-1 size-3.5 shrink-0" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Available when the class is equipped.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            What Assassin changes in a run
          </h2>
          <p className="text-muted-foreground mt-2 max-w-3xl leading-7">
            These are practical consequences of the checked perk list, not a
            claim that Assassin is the best class for every player.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {ninetyNineNightsAssassin.verifiedUseCases.map((useCase, index) => {
            const Icon = [Route, Swords, Target][index] ?? Route;

            return (
              <Card key={useCase.title}>
                <CardHeader>
                  <Icon className="text-primary size-5" />
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm leading-6">
                  {useCase.detail}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="border-amber-500/35 bg-amber-500/10">
          <CardHeader>
            <ShieldAlert className="size-5 text-amber-700 dark:text-amber-300" />
            <CardTitle>Tradeoffs before spending</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground space-y-3 text-sm leading-6">
              {ninetyNineNightsAssassin.tradeoffs.map((tradeoff) => (
                <li className="flex gap-2" key={tradeoff}>
                  <HeartPulse className="mt-1 size-3.5 shrink-0" />
                  <span>{tradeoff}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Diamond className="text-primary size-5" />
            <CardTitle>Diamond planning</CardTitle>
            <CardDescription>
              Check rewards and alternatives before committing 500 diamonds.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            {[
              {
                href: '/roblox/99-nights-in-the-forest/codes',
                title: 'Check current gem and diamond codes',
              },
              {
                href: '/roblox/99-nights-in-the-forest/gems',
                title: 'Review diamond and gem routes',
              },
              {
                href: '/roblox/99-nights-in-the-forest/classes',
                title: 'Compare every listed class price',
              },
              {
                href: '/roblox/99-nights-in-the-forest/missing-kids',
                title: 'Plan missing-child rescue routes',
              },
            ].map((item) => (
              <Link
                className="hover:bg-accent rounded-md border p-3"
                href={item.href}
                key={item.href}
              >
                {item.title}
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Source and limits</CardTitle>
            <CardDescription>
              Visible source dates keep changing game data separate from
              editorial advice.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground leading-6">
              {ninetyNineNightsAssassin.source.note}
            </p>
            <a
              className="text-primary inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline"
              href={ninetyNineNightsAssassin.source.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              Open the checked Assassin source
              <ExternalLink className="size-3.5" />
            </a>
            <p className="text-muted-foreground text-xs">
              Source revision {ninetyNineNightsAssassin.source.revisionAt};
              checked {ninetyNineNightsAssassin.source.checkedAt}.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Assassin class FAQ
          </h2>
          <div className="grid gap-4">
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
        </div>
      </section>
    </main>
  );
}
