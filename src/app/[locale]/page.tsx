import type { Metadata } from 'next';
import { getFeaturedRobloxGame, robloxGames } from '@/data/roblox-games';
import { seoKeywords } from '@/data/seo-keywords';
import { ArrowRight, CheckCircle2, Compass, RefreshCw } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { canonicalUrl, currentMonthYear, getBaseUrl } from '@/lib/seo';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const heroImageUrl = '/imgs/generated/questcodes-forest-hero-1781934073676.png';

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
  const activeCodeCount = featuredGame.codes.filter(
    (code) => code.status === 'active' || code.status === 'special'
  ).length;

  return (
    <main className="bg-background text-foreground min-h-screen">
      <header className="border-border/80 bg-background/90 sticky top-0 z-50 border-b backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="font-semibold tracking-tight" href="/">
            {envConfigs.app_name}
          </Link>
          <nav className="hidden items-center gap-5 text-sm md:flex">
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="/roblox"
            >
              Roblox
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="/codes"
            >
              Codes
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="/roblox/99-nights-in-the-forest/class-tier-list"
            >
              Tier Lists
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="/roblox/99-nights-in-the-forest/updates"
            >
              Updates
            </Link>
            <Link
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center rounded-md px-3 font-medium"
              href="/roblox/99-nights-in-the-forest"
            >
              Start here
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Roblox codes</Badge>
            <Badge variant="outline">Source checked</Badge>
            <Badge variant="outline">Updated pages</Badge>
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Working game codes and practical Roblox guides.
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-8">
              Quest Codes tracks working codes, class rankings, survival routes,
              animal taming requirements, and guide pages with visible checked
              dates and source trails.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium shadow-xs"
              href="/codes"
            >
              Browse code pages
              <ArrowRight className="size-4" />
            </Link>
            <Link
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-11 items-center justify-center rounded-md border px-5 text-sm font-medium shadow-xs"
              href="/roblox"
            >
              Browse Roblox hub
            </Link>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <img
              alt="Original Quest Codes forest campfire guide artwork"
              className="aspect-[16/9] w-full object-cover"
              fetchPriority="high"
              loading="eager"
              src={heroImageUrl}
            />
            <div className="space-y-4 p-5">
              <div>
                <Badge>{featuredGame.genre}</Badge>
                <h2 className="mt-3 text-2xl font-semibold">
                  {featuredGame.name}
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  {featuredGame.description}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-md border p-3">
                  <div className="font-semibold">{activeCodeCount}</div>
                  <div className="text-muted-foreground text-xs">
                    code entries
                  </div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="font-semibold">{livePages.length}</div>
                  <div className="text-muted-foreground text-xs">
                    live pages
                  </div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="font-semibold">
                    {featuredGame.stats.checkedAt}
                  </div>
                  <div className="text-muted-foreground text-xs">checked</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="border-border/80 border-y">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          <Card>
            <CardHeader>
              <CheckCircle2 className="text-primary size-5" />
              <CardTitle className="text-lg">Codes first</CardTitle>
              <CardDescription>
                Active, special, and expired code entries stay separate so users
                can see exactly what changed.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Compass className="text-primary size-5" />
              <CardTitle className="text-lg">Guides with context</CardTitle>
              <CardDescription>
                Tier lists, classes, animals, and survival pages are built from
                typed data and source notes.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <RefreshCw className="text-primary size-5" />
              <CardTitle className="text-lg">Freshness visible</CardTitle>
              <CardDescription>
                Pages show checked dates and avoid invented values, hidden
                formulas, or fake drop rates.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured Roblox Cluster
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              The first cluster is focused on one high-demand game before we
              expand into more Roblox titles.
            </p>
          </div>
          <Link
            className="text-primary text-sm font-medium underline-offset-4 hover:underline"
            href="/roblox/99-nights-in-the-forest"
          >
            Open game hub
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {livePages.map((page) => (
            <Card key={page.href}>
              <CardHeader>
                <CardTitle>{page.title}</CardTitle>
                <CardDescription>{page.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  className="text-primary inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
                  href={page.href}
                >
                  Open page
                  <ArrowRight className="size-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Current Roadmap
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {robloxGames.map((game) => (
              <Card key={game.slug}>
                <CardHeader>
                  <CardTitle>{game.name}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    className="text-primary text-sm font-medium underline-offset-4 hover:underline"
                    href={`/roblox/${game.slug}`}
                  >
                    View cluster
                  </Link>
                </CardContent>
              </Card>
            ))}
            <Card>
              <CardHeader>
                <CardTitle>More Roblox games</CardTitle>
                <CardDescription>
                  Grow a Garden 2, multi-game code pages, and update trackers
                  come after the first cluster is indexed.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            Quest Codes is a fan-made guide site and is not affiliated with
            Roblox or any Roblox game developer.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-service">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
