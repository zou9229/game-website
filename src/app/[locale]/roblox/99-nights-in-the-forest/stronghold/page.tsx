import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsStronghold } from '@/data/99-nights-stronghold';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  Castle,
  ExternalLink,
  Gem,
  MapPin,
  ShieldAlert,
  Swords,
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
    question: 'What is the Cultist Stronghold in 99 Nights in the Forest?',
    answer:
      'It is a high-risk structure with cultist waves, multiple floors, scaling difficulty, and reward chests. Quest Codes treats it as a prepared raid route, not a beginner objective.',
  },
  {
    question: 'Is Stronghold good for diamonds?',
    answer:
      'Yes, source data links the Stronghold to Diamond Chest rewards. For pure diamond farming, the checked Wiki guidance favors clearing level 1 instead of forcing harder levels for the same diamond value.',
  },
  {
    question: 'When should I raid the Stronghold?',
    answer:
      'Raid after you have ranged damage, food, ammo, a safe return route, and a class setup that fits combat. If the map route or supplies are weak, delay the raid.',
  },
  {
    question: 'Why is level 4 Stronghold hard?',
    answer:
      'The Stronghold has four levels, becomes harder after completed raids, and stays at level 4 after level 4 is beaten. Higher levels add more pressure and can include stronger cultists.',
  },
  {
    question: 'Which classes help with Stronghold raids?',
    answer:
      'Source notes mention combat-focused options such as Cyborg, Alien, Fire Bandit, Witch, Assassin, Brawler, or Vampire. Check the class tier list before spending diamonds.',
  },
  {
    question: 'Is this an official 99 Nights in the Forest guide?',
    answer:
      'No. Quest Codes is a fan-made source-checked guide site and is not affiliated with Roblox or the game developer.',
  },
];

const intentLabels = {
  entry: 'Entry route',
  diamonds: 'Diamonds',
  levels: 'Level scaling',
  classes: 'Class prep',
  'community-signal': 'Community signal',
} as const;

const intentStyles = {
  entry: 'border-blue-500/40 bg-blue-500/10',
  diamonds: 'border-emerald-500/40 bg-emerald-500/10',
  levels: 'border-amber-500/40 bg-amber-500/10',
  classes: 'border-purple-500/40 bg-purple-500/10',
  'community-signal': 'border-slate-500/40 bg-slate-500/10',
} as const;

const confidenceTone = {
  high: 'default',
  medium: 'secondary',
  low: 'outline',
} as const;

const relatedPages = [
  {
    href: '/roblox/99-nights-in-the-forest/gems',
    title: 'Gems and diamonds',
  },
  {
    href: '/roblox/99-nights-in-the-forest/classes',
    title: 'Class reference',
  },
  {
    href: '/roblox/99-nights-in-the-forest/class-tier-list',
    title: 'Class tier list',
  },
  {
    href: '/roblox/99-nights-in-the-forest/map',
    title: 'Map and locations',
  },
  {
    href: '/roblox/99-nights-in-the-forest/crafting',
    title: 'Crafting and bench upgrades',
  },
  {
    href: '/roblox/99-nights-in-the-forest/survival-guide',
    title: 'Survival guide',
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
    '/roblox/99-nights-in-the-forest/stronghold/',
    locale
  );

  return {
    title: `99 Nights in the Forest Stronghold Guide (${monthYear})`,
    description:
      'Cultist Stronghold guide for 99 Nights in the Forest with diamond farming notes, level 4 risk, class prep, and checked source links.',
    keywords: seoKeywords.ninetyNineNightsStronghold,
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Stronghold Guide (${monthYear})`,
      description:
        'Plan Cultist Stronghold raids with source-checked diamond, level, class, and risk notes.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function StrongholdPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/stronghold/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Stronghold', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const howToSchema = buildHowToSchema({
    name: 'How to prepare for Cultist Stronghold in 99 Nights in the Forest',
    description:
      'Prepare map routes, ranged weapons, supplies, and class choices before treating Stronghold as a diamond route.',
    steps: [
      {
        name: 'Find the Stronghold route',
        text: 'Use the map to locate the Stronghold and plan a safe return path before night pressure or food risk builds up.',
      },
      {
        name: 'Prepare ranged damage',
        text: 'Bring ranged weapons and enough supplies before entering because cultist waves can punish close-range fights.',
      },
      {
        name: 'Clear level 1 first',
        text: 'If diamonds are the goal, test level 1 value before pushing harder levels that increase risk without a confirmed better diamond reward.',
      },
      {
        name: 'Decide whether level 4 is worth it',
        text: 'Avoid level 4 attempts unless your class, ammo, food, and team setup can handle stronger wave pressure.',
      },
      {
        name: 'Update your plan after each source check',
        text: 'Recheck codes, class notes, and update pages after major patches because Roblox reward routes can change quickly.',
      },
    ],
  });
  const itemListSchema = buildItemListSchema({
    name: '99 Nights in the Forest Stronghold planning sections',
    description:
      'Entry route, diamond farming, level scaling, class prep, and community tactic signals.',
    items: ninetyNineNightsStronghold.sections.map((section) => ({
      name: section.title,
      url: `${pageUrl}#${section.intent}`,
      description: section.summary,
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
            <span className="text-foreground">Stronghold</span>
          </nav>

          <Badge variant="outline" className="mb-4 gap-1.5">
            <Castle className="size-3.5" />
            Checked {ninetyNineNightsStronghold.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            99 Nights in the Forest Cultist Stronghold guide
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            {ninetyNineNightsStronghold.summary} This guide focuses on the
            practical decision: when the Stronghold is worth entering, when
            level 4 is too risky, and how to connect the route to diamonds,
            classes, and map planning.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/gems"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            >
              Check diamond routes
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
            <CardTitle>Stronghold decision rule</CardTitle>
            <CardDescription>
              Do not raid just because the icon appears.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm leading-6">
            <p>
              Treat Cultist Stronghold as a prepared objective: map route,
              ranged weapon, supplies, class fit, and exit plan first.
            </p>
            <p>
              If you only want diamonds, source notes point toward testing level
              1 value before pushing harder levels.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <MapPin className="text-primary size-5" />
              <CardTitle>Find route</CardTitle>
              <CardDescription>
                Use the map before committing to the raid.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Gem className="text-primary size-5" />
              <CardTitle>Farm carefully</CardTitle>
              <CardDescription>
                Diamond value depends on risk, not only reward.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Swords className="text-primary size-5" />
              <CardTitle>Respect level 4</CardTitle>
              <CardDescription>
                Stronghold difficulty does not stay flat.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Users className="text-primary size-5" />
              <CardTitle>Pick class</CardTitle>
              <CardDescription>
                Match class spending to your normal route.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Stronghold route plan
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Read this in order: entry route, diamond value, level scaling,
              class prep, then community tactics. The page labels confidence so
              you can separate checked data from player signals.
            </p>
          </div>

          <div className="grid gap-4">
            {ninetyNineNightsStronghold.sections.map((section) => (
              <Card
                id={section.intent}
                key={section.title}
                className={intentStyles[section.intent]}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{intentLabels[section.intent]}</Badge>
                    <Badge variant={confidenceTone[section.confidence]}>
                      {section.confidence} confidence
                    </Badge>
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-3 md:grid-cols-3">
                    {section.do.map((item) => (
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
                    {section.avoid.map((item) => (
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

                  <div>
                    <h3 className="text-sm font-semibold">Sources</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {section.sources.map((source) => (
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
              <CardTitle>Related 99 Nights pages</CardTitle>
              <CardDescription>
                Stronghold decisions connect to diamonds, classes, and map
                routes.
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
                Short answers for Stronghold and level 4 searches.
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
