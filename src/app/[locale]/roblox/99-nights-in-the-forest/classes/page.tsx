import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsClasses } from '@/data/99-nights-classes';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import { AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildItemListSchema,
  buildVideoGameSchema,
  canonicalUrl,
} from '@/lib/seo';
import { ClassListBrowser } from '@/components/roblox/class-list-browser';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const game = getRobloxGame('99-nights-in-the-forest');
const activeClasses = ninetyNineNightsClasses.classes.filter(
  (entry) => entry.availability === 'active'
);
const limitedClasses = ninetyNineNightsClasses.classes.filter(
  (entry) => entry.availability === 'limited'
);
const removedClasses = ninetyNineNightsClasses.classes.filter(
  (entry) => entry.availability === 'removed'
);

const faqs = [
  {
    question: 'How many classes are in 99 Nights in the Forest?',
    answer: `The source snapshot checked on ${ninetyNineNightsClasses.checkedAt} lists ${activeClasses.length} active-pool classes, ${limitedClasses.length} limited classes, and ${removedClasses.length} removed class. The developer can change the pool after an update.`,
  },
  {
    question: 'Why is a class not available in the shop?',
    answer:
      'Active classes use a rotating stock, so an active-pool class may not be purchasable in the current shop rotation. Limited classes depend on their event.',
  },
  {
    question: 'What is the newest class in this list?',
    answer:
      'The checked source revision includes newer entries such as Alien Scientist, Gunslinger, Nightcrawler, Grenadier, and Feaster. Quest Codes does not infer which one the developer considers newest.',
  },
  {
    question: 'Is the tier list current for every class?',
    answer:
      'No. The tier groups below preserve a PC Gamer snapshot from December 2025 and do not rank classes added after that article. The current inventory and the dated tier snapshot are intentionally separated.',
  },
  {
    question: 'Is this class list official?',
    answer:
      "No. This is a fan-made reference based on a checked community-wiki revision and a dated editorial tier source. It is not affiliated with Roblox or Grandma's Favourite Games.",
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
  const canonical = canonicalUrl(
    '/roblox/99-nights-in-the-forest/classes/',
    locale
  );

  return {
    title: `All 99 Nights in the Forest Classes List`,
    description:
      'Search all 99 Nights in the Forest classes, listed prices, active and limited availability, plus a clearly dated class tier snapshot.',
    keywords: seoKeywords.ninetyNineNightsClasses,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `All 99 Nights in the Forest Classes List`,
      description:
        'Search the checked 99 Nights class inventory and separate current availability from older tier opinions.',
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
  const itemListSchema = buildItemListSchema({
    name: 'All 99 Nights in the Forest classes',
    description:
      'Searchable current class inventory with listed prices and availability labels.',
    items: ninetyNineNightsClasses.classes.map((entry) => ({
      name: entry.name,
      url: entry.detailHref
        ? canonicalUrl(`${entry.detailHref}/`, locale)
        : `${pageUrl}#${entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      description: `${entry.price.toLocaleString()} ${entry.currency.replace(/-/g, ' ')}; ${entry.availability} availability.`,
    })),
  });
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
      {[breadcrumbSchema, faqSchema, itemListSchema, videoGameSchema].map(
        (schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )
      )}

      <section className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Searchable class list</Badge>
            <Badge variant="outline">
              Checked {ninetyNineNightsClasses.checkedAt}
            </Badge>
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              All 99 Nights in the Forest Classes
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg leading-8">
              Search {ninetyNineNightsClasses.classes.length} class entries,
              compare listed prices, and separate the active pool from seasonal
              and removed classes before spending diamonds.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center gap-1.5 rounded-md px-4 text-sm font-medium shadow-xs"
              href={game.robloxUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Check in-game stock
              <ExternalLink className="size-3.5" />
            </a>
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
            <CardTitle>Current inventory scope</CardTitle>
            <CardDescription>
              Availability and ranking are different claims.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <dl className="grid grid-cols-3 gap-3 text-center">
              {[
                ['Active', activeClasses.length],
                ['Limited', limitedClasses.length],
                ['Removed', removedClasses.length],
              ].map(([label, value]) => (
                <div className="bg-muted/40 rounded-md p-3" key={label}>
                  <dd className="text-2xl font-semibold">{value}</dd>
                  <dt className="text-muted-foreground mt-1 text-xs">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
            <p className="text-muted-foreground text-sm leading-6">
              Inventory source revision:{' '}
              {ninetyNineNightsClasses.inventorySource.revisionAt}. A class in
              the active pool can still be absent from the current rotating
              shop.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Search the class inventory
          </h2>
          <p className="text-muted-foreground mt-2 max-w-3xl leading-7">
            Prices and availability labels follow the checked community-wiki
            revision. Open a source entry for perk details, then verify the live
            shop before buying.
          </p>
        </div>
        <ClassListBrowser classes={ninetyNineNightsClasses.classes} />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <RefreshCw className="text-primary size-5" />
            <CardTitle>Rotating stock</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-6">
            The active pool rotates in the class shop. Missing from today&apos;s
            stock does not mean removed from the game.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Limited classes</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-6">
            Candy, candy-cane, and egg classes depend on their events. Do not
            treat an old event price as proof that the class is currently
            obtainable.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Source boundary</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-6">
            Quest Codes publishes the visible inventory snapshot but does not
            invent stock odds, hidden reroll rules, or rankings for new classes.
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <Card className="border-amber-500/40 bg-amber-500/10">
          <CardContent className="flex gap-3 py-4">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <div>
              <h2 className="font-semibold">Dated tier snapshot</h2>
              <p className="text-muted-foreground mt-1 text-sm leading-6">
                The groups below come from PC Gamer&apos;s{' '}
                {ninetyNineNightsClasses.tierSource.lastUpdated} article. They
                do not rank newer classes such as Alien Scientist, Gunslinger,
                Nightcrawler, Grenadier, or Feaster and should not be presented
                as a complete July 2026 meta.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {ninetyNineNightsClasses.tierSnapshot.map((tier) => (
            <Card className={tierTone(tier.tier)} key={tier.tier}>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>{tier.label}</Badge>
                  <CardTitle className="text-lg">{tier.summary}</CardTitle>
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
            <CardTitle>Source trail</CardTitle>
            <CardDescription>
              Current inventory and older ranking opinion remain separate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              ninetyNineNightsClasses.inventorySource,
              ninetyNineNightsClasses.tierSource,
            ].map((source) => (
              <a
                className="hover:bg-accent flex items-start justify-between gap-3 rounded-md border p-3"
                href={source.url}
                key={source.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>
                  <span className="block font-medium">{source.name}</span>
                  <span className="text-muted-foreground mt-1 block">
                    {source.note}
                  </span>
                </span>
                <ExternalLink className="mt-0.5 size-4 shrink-0" />
              </a>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next decisions</CardTitle>
            <CardDescription>
              Connect class spending to the route you actually play.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            {[
              {
                href: '/roblox/99-nights-in-the-forest/codes',
                title: 'Check current gem codes',
              },
              {
                href: '/roblox/99-nights-in-the-forest/gems',
                title: 'Plan diamonds and gems',
              },
              {
                href: '/roblox/99-nights-in-the-forest/survival-guide',
                title: 'Review the survival route',
              },
              {
                href: '/roblox/99-nights-in-the-forest/zookeeper-vs-beastmaster',
                title: 'Compare taming classes',
              },
              {
                href: '/roblox/99-nights-in-the-forest/classes/assassin',
                title: 'Open the Assassin class guide',
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

      <section className="space-y-4">
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
    </main>
  );
}
