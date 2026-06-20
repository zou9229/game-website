import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ninetyNineNightsBadges } from '@/data/99-nights-badges';
import { getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  Award,
  ExternalLink,
  Gem,
  Route,
  ShieldCheck,
  Trophy,
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
    question: 'What are badges in 99 Nights in the Forest?',
    answer:
      'Badges are achievement goals tied to survival milestones, campfire progress, combat, exploration, and challenge runs. Some source lists connect first-time badge completion to diamond rewards.',
  },
  {
    question: 'What badge should I get first?',
    answer:
      'Start with normal survival and campfire goals before chasing harder badge-only objectives. Early survival milestones, Combat, First Aid, Gardening, and Firemaking are better first targets.',
  },
  {
    question: 'How do I get the Humiliation Badge?',
    answer:
      'PC Gamer reports that the Humiliation Badge secret action is dying to your own bear traps in a throwaway run, with a four-diamond reward if the condition succeeds.',
  },
  {
    question: 'Are badge diamond totals official?',
    answer:
      'No. Quest Codes treats exact badge totals as source-checked community wiki data unless an official Roblox game source confirms them.',
  },
  {
    question: 'Should I farm badges before redeeming codes?',
    answer:
      'Redeem current codes first because they are faster. Badges are a secondary progression path that overlaps survival, gems, classes, and long-run goals.',
  },
];

const intentLabels = {
  starter: 'Starter',
  progression: 'Progression',
  challenge: 'Challenge',
  secret: 'Secret',
} as const;

const intentStyles = {
  starter: 'border-emerald-500/40 bg-emerald-500/10',
  progression: 'border-blue-500/40 bg-blue-500/10',
  challenge: 'border-amber-500/40 bg-amber-500/10',
  secret: 'border-purple-500/40 bg-purple-500/10',
} as const;

const confidenceTone = {
  high: 'default',
  medium: 'secondary',
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl(
    '/roblox/99-nights-in-the-forest/badges/',
    locale
  );

  return {
    title: `99 Nights in the Forest Badges Guide (${monthYear})`,
    description:
      'Source-checked 99 Nights in the Forest badge guide covering starter badges, diamond rewards, challenge badges, and the Humiliation Badge route.',
    keywords: seoKeywords.ninetyNineNightsBadges,
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Badges Guide (${monthYear})`,
      description:
        'Plan badge routes for 99 Nights in the Forest without relying on unsourced diamond claims.',
      url: canonical,
      type: 'article',
      images: game ? [game.imageUrl] : undefined,
    },
  };
}

export default async function BadgesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!game) notFound();

  const pageUrl = canonicalUrl(
    '/roblox/99-nights-in-the-forest/badges/',
    locale
  );
  const gameUrl = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: gameUrl },
    { name: 'Badges', item: pageUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);
  const itemListSchema = buildItemListSchema({
    name: '99 Nights in the Forest badge routes',
    description:
      'Starter, progression, challenge, and secret badge routes for 99 Nights in the Forest.',
    items: ninetyNineNightsBadges.clusters.map((cluster) => ({
      name: cluster.title,
      url: `${pageUrl}#${cluster.intent}`,
      description: cluster.summary,
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
            <span className="text-foreground">Badges</span>
          </nav>

          <Badge variant="outline" className="mb-4 gap-1.5">
            <Award className="size-3.5" />
            Checked {ninetyNineNightsBadges.checkedAt}
          </Badge>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            99 Nights in the Forest badges guide
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            {ninetyNineNightsBadges.summary} This guide separates easy starter
            badges, long-run progression goals, harder challenge badges, and the
            Humiliation Badge diamond route.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roblox/99-nights-in-the-forest/gems"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            >
              Compare gem routes
            </Link>
            <Link
              href="/roblox/99-nights-in-the-forest/survival-guide"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            >
              Open survival guide
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Badge reward note</CardTitle>
            <CardDescription>
              Exact totals can change after game updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm leading-6">
            <p>{ninetyNineNightsBadges.rewardNote}</p>
            <p>
              Quest Codes labels source confidence so badge pages do not turn
              community-maintained data into an official promise.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <Trophy className="text-primary size-5" />
              <CardTitle>Starter goals</CardTitle>
              <CardDescription>
                Easier badges that overlap normal play.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Route className="text-primary size-5" />
              <CardTitle>Progression route</CardTitle>
              <CardDescription>
                Longer runs, campfire, tools, and quests.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <ShieldCheck className="text-primary size-5" />
              <CardTitle>Challenge checks</CardTitle>
              <CardDescription>
                Bosses, stronghold, restrictions, and hard mode.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Gem className="text-primary size-5" />
              <CardTitle>Diamond context</CardTitle>
              <CardDescription>
                Badge rewards connect back to gems and classes.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Badge routes by intent
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Pick the badge group that matches your current run. The safest
              path is codes first, then starter badges, then progression and
              challenge badges.
            </p>
          </div>

          <div className="grid gap-4">
            {ninetyNineNightsBadges.clusters.map((cluster) => (
              <Card
                id={cluster.intent}
                key={cluster.title}
                className={intentStyles[cluster.intent]}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{intentLabels[cluster.intent]}</Badge>
                    <Badge variant={confidenceTone[cluster.confidence]}>
                      {cluster.confidence} confidence
                    </Badge>
                  </div>
                  <CardTitle>{cluster.title}</CardTitle>
                  <CardDescription>{cluster.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-3 md:grid-cols-3">
                    {cluster.examples.map((example) => (
                      <div
                        key={example}
                        className="bg-background/80 rounded-md border p-4"
                      >
                        <h3 className="text-sm font-semibold">Example</h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {example}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {cluster.notes.map((note) => (
                      <div key={note} className="bg-background rounded-md p-4">
                        <h3 className="text-sm font-semibold">Planning note</h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {note}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">Sources</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cluster.sources.map((source) => (
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
              <CardTitle>Best next pages</CardTitle>
              <CardDescription>
                Badge searches should lead into the rest of the 99 Nights
                cluster.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              {[
                {
                  href: '/roblox/99-nights-in-the-forest/gems',
                  title: 'Gems and diamonds',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/codes',
                  title: 'Working codes',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/survival-guide',
                  title: 'Survival guide',
                },
                {
                  href: '/roblox/99-nights-in-the-forest/classes',
                  title: 'Class reference',
                },
              ].map((item) => (
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
                Short answers for badge and diamond searches.
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
