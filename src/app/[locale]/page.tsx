import type { Metadata } from 'next';
import { ninetyNineNightsMedia } from '@/data/99-nights-media';
import { getFeaturedRobloxGame, robloxGames } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  ExternalLink,
  Gamepad2,
  MapIcon,
  RefreshCw,
  Shield,
  Sparkles,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { canonicalUrl, currentMonthYear, getBaseUrl } from '@/lib/seo';
import { CopyCodeButton } from '@/components/roblox/copy-code-button';
import { GuideMediaPanel } from '@/components/roblox/guide-media-panel';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const heroImageUrl = '/imgs/roblox/99-nights-thumbnail-1.jpg';

const routeCards = [
  {
    title: 'Codes desk',
    href: '/roblox/99-nights-in-the-forest/codes',
    description:
      'Copy working codes, check special redemption notes, and avoid expired event rewards.',
    image: '/imgs/roblox/99-nights-thumbnail-1.jpg',
    icon: CheckCircle2,
    label: 'Start here',
  },
  {
    title: 'Crafting route',
    href: '/roblox/99-nights-in-the-forest/crafting',
    description:
      'Plan map, compass, bandages, bench upgrades, and gem crafts before spending materials.',
    image: '/imgs/roblox/99-nights-thumbnail-2.jpg',
    icon: Compass,
    label: 'Route planning',
  },
  {
    title: 'Class and animal picks',
    href: '/roblox/99-nights-in-the-forest/class-tier-list',
    description:
      'Compare class choices, taming routes, Zookeeper, Beastmaster, and animal planning.',
    image: '/imgs/roblox/99-nights-thumbnail-3.jpg',
    icon: Shield,
    label: 'Decisions',
  },
];

const missionBoards = [
  {
    title: 'Reward checks',
    description: 'Codes, gems, badges, and update pages that change fastest.',
    hrefs: [
      '/roblox/99-nights-in-the-forest/codes',
      '/roblox/99-nights-in-the-forest/gems',
      '/roblox/99-nights-in-the-forest/badges',
      '/roblox/99-nights-in-the-forest/updates',
    ],
  },
  {
    title: 'Survival planning',
    description:
      'Routes for map movement, missing kids, Stronghold, and camp survival.',
    hrefs: [
      '/roblox/99-nights-in-the-forest/map',
      '/roblox/99-nights-in-the-forest/missing-kids',
      '/roblox/99-nights-in-the-forest/stronghold',
      '/roblox/99-nights-in-the-forest/survival-guide',
    ],
  },
  {
    title: 'Build choices',
    description:
      'Crafting, classes, animals, taming, and late-game material decisions.',
    hrefs: [
      '/roblox/99-nights-in-the-forest/crafting',
      '/roblox/99-nights-in-the-forest/classes',
      '/roblox/99-nights-in-the-forest/animals',
      '/roblox/99-nights-in-the-forest/taming-flute',
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = canonicalUrl('/', locale);
  const monthYear = currentMonthYear();

  return {
    title: `Quest Codes - Roblox Codes and Game Guides (${monthYear})`,
    description:
      'Quest Codes tracks working Roblox game codes, class tier lists, survival guides, animal taming references, and source-checked game updates.',
    keywords: seoKeywords.home,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `Quest Codes - Roblox Codes and Game Guides (${monthYear})`,
      description:
        'Source-checked Roblox codes, class tier lists, survival guides, and game references.',
      url: canonical,
      images: [
        { url: `${getBaseUrl()}${heroImageUrl}`, width: 1280, height: 720 },
      ],
      type: 'website',
    },
  };
}

export default function HomePage() {
  const featuredGame = getFeaturedRobloxGame();
  const livePages = featuredGame.pages.filter((page) => page.status === 'live');
  const activeCodes = featuredGame.codes.filter(
    (code) => code.status === 'active' || code.status === 'special'
  );

  return (
    <main className="min-h-screen bg-[#edf4ed] text-emerald-950">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061611]/92 text-white shadow-sm backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            className="flex items-center gap-2 font-semibold tracking-tight"
            href="/"
          >
            <img
              src="/logo.png"
              alt=""
              className="h-9 w-8 object-contain"
              aria-hidden="true"
            />
            {envConfigs.app_name}
          </Link>
          <nav className="flex flex-wrap items-center gap-1.5 text-sm">
            <Link
              className="rounded-md px-2.5 py-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              href="/roblox"
            >
              Roblox
            </Link>
            <Link
              className="rounded-md px-2.5 py-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              href="/codes"
            >
              Codes
            </Link>
            <Link
              className="rounded-md px-2.5 py-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              href="/roblox/99-nights-in-the-forest/class-tier-list"
            >
              Tier Lists
            </Link>
            <Link
              className="rounded-md bg-lime-300 px-3 py-1.5 font-semibold text-emerald-950 transition-colors hover:bg-lime-200"
              href="/roblox/99-nights-in-the-forest"
            >
              99 Nights hub
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative isolate min-h-[82svh] overflow-hidden px-4 pt-14 pb-20 text-white sm:px-6 lg:px-8">
        <img
          src={heroImageUrl}
          alt="99 Nights in the Forest Roblox thumbnail used as Quest Codes hero background"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,8,0.96)_0%,rgba(3,10,8,0.84)_42%,rgba(3,10,8,0.48)_72%,rgba(3,10,8,0.76)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#edf4ed] via-[#edf4ed]/70 to-transparent" />

        <div className="relative mx-auto grid min-h-[58svh] max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(360px,0.78fr)]">
          <div className="max-w-3xl space-y-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-lime-200/20 bg-lime-200/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-lime-100 uppercase">
                <Gamepad2 className="size-3.5" />
                Source-checked Roblox guides
              </span>
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 font-mono text-xs tracking-[0.14em] text-white/68 uppercase">
                {livePages.length} live pages
              </span>
            </div>

            <div>
              <h1 className="max-w-4xl text-4xl leading-[1.02] font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Codes, routes, and decisions for Roblox players.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/74 sm:text-lg">
                Quest Codes turns current Roblox code checks, class choices,
                crafting routes, and survival questions into fast, practical
                guide pages with visible source trails.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-lime-300 px-7 text-sm font-bold text-emerald-950 shadow-sm transition-colors hover:bg-lime-200"
                href="/roblox/99-nights-in-the-forest/codes"
              >
                Copy current codes
                <ArrowRight className="size-4" />
              </Link>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/8 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/16"
                href="/roblox/99-nights-in-the-forest"
              >
                Open guide hub
              </Link>
            </div>

            <div className="grid max-w-2xl grid-cols-3 overflow-hidden rounded-lg border border-white/12 bg-black/20 text-sm backdrop-blur-md">
              <HeroStat
                label="Active or special"
                value={activeCodes.length.toString()}
              />
              <HeroStat
                label="Game visits"
                value={`${(featuredGame.stats.visits / 1000000000).toFixed(1)}B`}
              />
              <HeroStat label="Checked" value={featuredGame.stats.checkedAt} />
            </div>
          </div>

          <div className="rounded-lg border border-lime-200/20 bg-[#062016]/88 p-4 shadow-2xl shadow-black/35 backdrop-blur-md sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-lime-200/12 px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-lime-100 uppercase">
                <Sparkles className="size-3.5" />
                Today&apos;s code desk
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/60 uppercase">
                {featuredGame.shortName}
              </span>
            </div>

            <div className="space-y-3 rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4">
              {activeCodes.map((code) => (
                <div
                  key={code.code}
                  className="rounded-md border border-white/10 bg-white/[0.04] p-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-base font-black text-white">
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
              <p className="text-xs leading-5 text-white/58">
                Special codes can use a different redemption path. Open the
                codes page before marking a result expired.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-emerald-800/70 uppercase">
                Start with the answer
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl">
                Pick the problem you are solving right now.
              </h2>
            </div>
            <Link
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-950/20 bg-white/60 px-4 py-2 text-sm font-semibold text-emerald-950 hover:bg-white"
              href="/roblox/99-nights-in-the-forest"
            >
              Full hub
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {routeCards.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group relative min-h-[330px] overflow-hidden rounded-lg border border-emerald-950/12 bg-zinc-950 shadow-sm"
                >
                  <img
                    src={card.image}
                    alt={`${card.title} visual for 99 Nights in the Forest`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/36 to-black/12" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-bold tracking-[0.14em] text-lime-100 uppercase backdrop-blur">
                      <Icon className="size-3.5" />
                      {card.label}
                    </span>
                    <h3 className="mt-4 text-2xl font-black tracking-tight">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/72">
                      {card.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <GuideMediaPanel
            title="Real game media and research signals"
            description="Official Roblox thumbnails give visual context, while YouTube searches help spot player questions before we turn them into source-checked pages."
            images={ninetyNineNightsMedia.images}
            videoSearches={ninetyNineNightsMedia.videoSearches}
          />
        </div>
      </section>

      <section className="border-y border-emerald-950/10 bg-white/48 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-bold tracking-[0.18em] text-emerald-800/70 uppercase">
              Guide mission board
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl">
              A focused 99 Nights cluster before adding more games.
            </h2>
            <p className="mt-3 text-sm leading-6 text-emerald-950/62">
              The first cluster is intentionally narrow: one popular game,
              stronger internal links, checked dates, and pages that answer
              specific player intent.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {missionBoards.map((board) => (
              <Card
                key={board.title}
                className="rounded-lg border-emerald-950/12 bg-white/76"
              >
                <CardHeader>
                  <CardTitle>{board.title}</CardTitle>
                  <CardDescription>{board.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {board.hrefs.map((href) => {
                    const page = livePages.find((item) => item.href === href);
                    if (!page) return null;

                    return (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-start justify-between gap-3 rounded-md border border-emerald-950/10 bg-white/70 p-3 text-sm transition-colors hover:bg-white"
                      >
                        <span>
                          <span className="block font-semibold">
                            {page.title}
                          </span>
                          <span className="mt-1 line-clamp-2 block text-xs leading-5 text-emerald-950/58">
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
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          <FeatureCard
            icon={CheckCircle2}
            title="Codes first"
            description="Active, special, and expired code entries stay separate so players know what to test."
          />
          <FeatureCard
            icon={MapIcon}
            title="Route context"
            description="Crafting, map, missing kids, and survival pages are grouped around player decisions."
          />
          <FeatureCard
            icon={RefreshCw}
            title="Freshness visible"
            description="Pages show checked dates and avoid invented values, hidden formulas, or fake drop rates."
          />
        </div>
      </section>

      <section className="bg-emerald-950 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[1fr_320px] md:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-lime-100/70 uppercase">
              Current roadmap
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              More Roblox games come after the first cluster earns data.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/68">
              We are watching GSC impressions, Semrush long tails, YouTube
              demand, and source freshness before scaling into the next game.
            </p>
          </div>
          <div className="rounded-lg border border-white/12 bg-white/8 p-4">
            {robloxGames.map((game) => (
              <Link
                key={game.slug}
                className="flex items-center justify-between gap-3 rounded-md p-3 transition-colors hover:bg-white/8"
                href={`/roblox/${game.slug}`}
              >
                <span>
                  <span className="block font-semibold">{game.name}</span>
                  <span className="mt-1 block text-xs text-white/56">
                    {game.pages.filter((page) => page.status === 'live').length}{' '}
                    live guide pages
                  </span>
                </span>
                <ArrowRight className="size-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-emerald-950/10 bg-[#edf4ed]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-emerald-950/64 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            Quest Codes is a fan-made guide site and is not affiliated with
            Roblox or any Roblox game developer.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-service">Terms</Link>
            <a
              href={featuredGame.robloxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
            >
              Roblox
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-white/10 p-4 last:border-r-0">
      <div className="text-[0.66rem] font-semibold tracking-[0.18em] text-white/42 uppercase">
        {label}
      </div>
      <div className="mt-2 text-xl font-bold text-white">{value}</div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof CheckCircle2;
  title: string;
  description: string;
}) {
  return (
    <Card className="rounded-lg border-emerald-950/12 bg-white/70">
      <CardHeader>
        <Icon className="text-primary size-5" />
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
