import type { Metadata } from 'next';
import { ninetyNineNightsMedia } from '@/data/99-nights-media';
import { getLatestCodeCheckedAt, getRobloxGame } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Hammer,
  MapIcon,
  Shield,
  Sparkles,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  buildBreadcrumbSchema,
  buildVideoGameSchema,
  canonicalUrl,
  currentMonthYear,
  getBaseUrl,
} from '@/lib/seo';
import { CopyCodeButton } from '@/components/roblox/copy-code-button';
import { GuideMediaPanel } from '@/components/roblox/guide-media-panel';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const game = getRobloxGame('99-nights-in-the-forest');
const heroImageUrl = '/imgs/roblox/99-nights-thumbnail-1.jpg';

const actionCards = [
  {
    title: 'Need working codes?',
    description: 'Check active, special, and expired code entries first.',
    href: '/roblox/99-nights-in-the-forest/codes',
    linkLabel: 'Open codes',
    icon: CheckCircle2,
  },
  {
    title: 'Planning a craft?',
    description: 'Use the crafting route before spending rare materials.',
    href: '/roblox/99-nights-in-the-forest/crafting',
    linkLabel: 'Open crafting',
    icon: Hammer,
  },
  {
    title: 'Choosing a class?',
    description: 'Compare class unlocks and tier-list disagreements.',
    href: '/roblox/99-nights-in-the-forest/classes',
    linkLabel: 'Open classes',
    icon: Shield,
  },
  {
    title: 'Routing the map?',
    description: 'Plan missing kids, Stronghold, and longer survival runs.',
    href: '/roblox/99-nights-in-the-forest/map',
    linkLabel: 'Open map guide',
    icon: MapIcon,
  },
];

const pageGroups = [
  {
    title: 'Rewards and updates',
    description: 'Use these pages when you need current reward status.',
    pages: ['Codes', 'Gems', 'Badges', 'Updates'],
  },
  {
    title: 'Crafting and materials',
    description: 'Material decisions, bench upgrades, and rare gem routes.',
    pages: [
      'Crafting',
      'Crafting Bench 5',
      'Bandages',
      'Pelt Trader',
      'Gem of the Forest',
      'Forest Gem Fragments',
    ],
  },
  {
    title: 'Routes and survival',
    description: 'Pages for location routing and longer run planning.',
    pages: ['Map', 'Missing Kids', 'Stronghold', 'Survival Guide'],
  },
  {
    title: 'Classes and animals',
    description: 'Unlock priorities, pet planning, and taming choices.',
    pages: [
      'Classes',
      'Class Tier List',
      'Animals',
      'Taming Flute',
      'Zookeeper vs Beastmaster',
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const monthYear = currentMonthYear();
  const canonical = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);

  return {
    title: `99 Nights in the Forest Guide and Tools (${monthYear})`,
    description:
      '99 Nights in the Forest Roblox hub with codes, class references, tier list, animals, survival guide, and checked game facts.',
    keywords: seoKeywords.ninetyNineNightsHub,
    alternates: { canonical },
    openGraph: {
      title: `99 Nights in the Forest Guide and Tools (${monthYear})`,
      description:
        '99 Nights in the Forest Roblox hub with codes, class references, tier list, animals, survival guide, and checked game facts.',
      url: canonical,
      images: [
        { url: `${getBaseUrl()}${heroImageUrl}`, width: 1280, height: 720 },
      ],
      type: 'website',
    },
  };
}

export default async function GameHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!game) return null;

  const latestCodeCheckedAt = getLatestCodeCheckedAt(game);
  const livePages = game.pages.filter((page) => page.status === 'live');
  const activeCodeCount = game.codes.filter(
    (code) => code.status === 'active' || code.status === 'special'
  ).length;
  const canonical = canonicalUrl('/roblox/99-nights-in-the-forest/', locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: canonicalUrl('/', locale) },
    { name: 'Roblox', item: canonicalUrl('/roblox/', locale) },
    { name: game.name, item: canonical },
  ]);
  const videoGameSchema = buildVideoGameSchema({
    name: game.name,
    description: game.description,
    url: canonical,
    imageUrl: game.imageUrl,
    developer: game.developer,
    genre: game.genre,
    dateModified: game.updatedAt,
  });

  return (
    <main className="bg-background min-h-screen">
      {[breadcrumbSchema, videoGameSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="relative isolate overflow-hidden px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
        <img
          src={heroImageUrl}
          alt="99 Nights in the Forest Roblox thumbnail used as the guide hub background"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,8,0.96)_0%,rgba(3,10,8,0.84)_45%,rgba(3,10,8,0.54)_76%,rgba(3,10,8,0.8)_100%)]" />
        <div className="from-background via-background/72 absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent" />

        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_390px] lg:items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-lime-200/20 bg-lime-200/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-lime-100 uppercase">
                Roblox {game.genre}
              </span>
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 font-mono text-xs tracking-[0.14em] text-white/68 uppercase">
                {livePages.length} live guides
              </span>
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 font-mono text-xs tracking-[0.14em] text-white/68 uppercase">
                Codes checked {latestCodeCheckedAt}
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl leading-[1.02] font-black tracking-tight text-white md:text-6xl">
                {game.name} guide desk
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-white/72">
                A source-checked route map for codes, crafting, classes,
                animals, map planning, and survival decisions in 99 Nights in
                the Forest.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['Active or special codes', activeCodeCount.toString()],
                ['Live guide pages', livePages.length.toString()],
                [
                  'Roblox visits',
                  `${(game.stats.visits / 1000000000).toFixed(1)}B`,
                ],
              ].map(([label, value]) => (
                <div
                  className="rounded-lg border border-white/12 bg-black/20 p-4 shadow-xs backdrop-blur"
                  key={label}
                >
                  <div className="text-2xl font-semibold text-white">
                    {value}
                  </div>
                  <div className="mt-1 text-xs text-white/54">{label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/roblox/99-nights-in-the-forest/codes"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-lime-300 px-5 text-sm font-bold text-emerald-950 shadow-xs transition-colors hover:bg-lime-200"
              >
                View codes
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={game.robloxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/8 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/16"
              >
                Roblox page
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-lime-200/20 bg-[#062016]/88 p-4 shadow-2xl shadow-black/35 backdrop-blur-md sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-lime-200/12 px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-lime-100 uppercase">
                <Sparkles className="size-3.5" />
                Current guide actions
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/60 uppercase">
                {game.shortName}
              </span>
            </div>

            <div className="space-y-3 rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4">
              {game.codes
                .filter(
                  (code) =>
                    code.status === 'active' || code.status === 'special'
                )
                .map((code) => (
                  <div
                    key={code.code}
                    className="rounded-md border border-white/10 bg-white/[0.04] p-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="font-mono text-sm font-black text-white">
                          {code.code}
                        </div>
                        <div className="mt-1 text-xs leading-5 text-white/62">
                          {code.reward}
                        </div>
                      </div>
                      <span className="rounded-full bg-lime-300/16 px-2.5 py-1 text-xs font-semibold tracking-wide text-lime-100 uppercase">
                        {code.status}
                      </span>
                    </div>
                    <div className="mt-3">
                      <CopyCodeButton
                        code={code.code}
                        className="border-white/15 bg-white/10 text-white hover:bg-white/16 hover:text-white"
                      />
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {actionCards.map((card) => {
                const Icon = card.icon;

                return (
                  <Link
                    className="rounded-md border border-white/10 bg-white/[0.04] p-3 text-sm text-white transition-colors hover:bg-white/10"
                    href={card.href}
                    key={card.href}
                  >
                    <div className="flex items-center gap-2 font-medium">
                      <Icon className="size-4 text-lime-200" />
                      {card.title}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/60">
                      {card.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-border/80 bg-card border-y">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ['Playing', game.stats.playing.toLocaleString()],
            ['Visits', game.stats.visits.toLocaleString()],
            ['Favorites', game.stats.favorites.toLocaleString()],
            ['Max players', game.maxPlayers.toString()],
          ].map(([label, value]) => (
            <Card key={label} className="rounded-lg">
              <CardHeader>
                <CardDescription>{label}</CardDescription>
                <CardTitle>{value}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Choose a guide path
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-6">
            The hub is grouped by player intent so visitors can move from a
            quick code check into the next practical decision.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {pageGroups.map((group) => (
            <Card className="rounded-lg" key={group.title}>
              <CardHeader>
                <CardTitle>{group.title}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-2">
                {group.pages.map((title) => {
                  const page = game.pages.find((item) => item.title === title);
                  if (!page) return null;

                  return (
                    <Link
                      className="hover:bg-accent flex items-start justify-between gap-3 rounded-md border p-3 text-sm transition-colors"
                      href={page.href}
                      key={page.href}
                    >
                      <span>
                        <span className="block font-medium">{page.title}</span>
                        <span className="text-muted-foreground mt-1 line-clamp-2 block leading-5">
                          {page.description}
                        </span>
                      </span>
                      <ArrowRight className="mt-0.5 size-4 shrink-0" />
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <GuideMediaPanel
          title="Gameplay media and video research"
          description="Real 99 Nights thumbnails and current YouTube searches used for visual context and demand discovery."
          images={ninetyNineNightsMedia.images}
          videoSearches={ninetyNineNightsMedia.videoSearches}
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          All 99 Nights pages
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-6">
          Full cluster inventory. Each live page keeps its own metadata,
          canonical URL, source policy, and related internal links.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {game.pages.map((page) => (
            <Card key={page.href} className="rounded-lg">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>{page.title}</CardTitle>
                  <Badge
                    variant={page.status === 'live' ? 'default' : 'outline'}
                  >
                    {page.status === 'live' ? 'Live' : 'Planned'}
                  </Badge>
                </div>
                <CardDescription>{page.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {page.status === 'live' ? (
                  <Link
                    href={page.href}
                    className="text-primary text-sm font-medium underline-offset-4 hover:underline"
                  >
                    Open {page.title.toLowerCase()}
                  </Link>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Planned after a verified data pass.
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
