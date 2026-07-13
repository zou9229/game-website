'use client';

import {
  getFeaturedRobloxGame,
  getLatestCodeCheckedAt,
} from '@/data/roblox-games';
import { ChevronRight, ExternalLink, Gamepad2, Home } from 'lucide-react';

import { Link, usePathname } from '@/core/i18n/navigation';
import { cn } from '@/lib/utils';

const priorityPageTitles = [
  'Codes',
  'Crafting',
  'Crafting Bench 5',
  'Bandages',
  'Pelt Trader',
  'Classes',
  'Class Tier List',
  'Animals',
  'Map',
  'Missing Kids',
  'Stronghold',
  'Updates',
];

const clusterImageUrl = '/imgs/roblox/99-nights-thumbnail-3.jpg';
const gameIconUrl = '/imgs/roblox/99-nights-game-icon.png';

function normalizePath(pathname: string) {
  return pathname === '/' ? pathname : pathname.replace(/\/+$/, '');
}

export function RobloxClusterNav() {
  const pathname = normalizePath(usePathname());
  const game = getFeaturedRobloxGame();
  const latestCodeCheckedAt = getLatestCodeCheckedAt(game);
  const gameHref = `/roblox/${game.slug}`;
  const isGameHub = pathname === gameHref;
  const livePageCount = game.pages.filter(
    (page) => page.status === 'live'
  ).length;
  const currentPage = game.pages.find(
    (page) => normalizePath(page.href) === pathname
  );
  const visiblePages = priorityPageTitles
    .map((title) => game.pages.find((page) => page.title === title))
    .filter(Boolean);

  return (
    <section
      className={cn(
        'border-border/80 relative overflow-hidden border-b',
        currentPage ? 'bg-[#061611] text-white' : 'bg-card'
      )}
      aria-label="99 Nights guide controls"
    >
      {currentPage ? (
        <>
          <img
            src={clusterImageUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-black/65" />
        </>
      ) : null}

      <div className="relative mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Breadcrumb"
            className={cn(
              'flex flex-wrap items-center gap-1.5 text-sm',
              currentPage ? 'text-white/58' : 'text-muted-foreground'
            )}
          >
            <Link
              className={cn(
                'inline-flex items-center gap-1 transition-colors',
                currentPage ? 'hover:text-white' : 'hover:text-foreground'
              )}
              href="/"
            >
              <Home className="size-3.5" />
              Home
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <Link
              className={cn(
                'transition-colors',
                currentPage ? 'hover:text-white' : 'hover:text-foreground'
              )}
              href="/roblox"
            >
              Roblox
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            {isGameHub ? (
              <span className={currentPage ? 'text-white' : 'text-foreground'}>
                {game.shortName}
              </span>
            ) : (
              <Link
                className={cn(
                  'transition-colors',
                  currentPage ? 'hover:text-white' : 'hover:text-foreground'
                )}
                href={gameHref}
              >
                {game.shortName}
              </Link>
            )}
            {currentPage ? (
              <>
                <ChevronRight className="size-3.5" aria-hidden="true" />
                <span className="font-medium text-white">
                  {currentPage.title}
                </span>
              </>
            ) : null}
          </nav>

          <div
            className={cn(
              'flex flex-wrap items-center gap-2 text-xs',
              currentPage ? 'text-white/62' : 'text-muted-foreground'
            )}
          >
            <span
              className={cn(
                'rounded-full border px-2.5 py-1',
                currentPage
                  ? 'border-white/12 bg-white/8'
                  : 'border-border bg-background'
              )}
            >
              {livePageCount} live guides
            </span>
            <span
              className={cn(
                'rounded-full border px-2.5 py-1',
                currentPage
                  ? 'border-lime-200/20 bg-lime-200/10 text-lime-100'
                  : 'border-border bg-background'
              )}
            >
              codes checked {latestCodeCheckedAt}
            </span>
          </div>
        </div>

        {currentPage ? (
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <img
                src={gameIconUrl}
                alt={`${game.name} Roblox game icon`}
                className="size-16 shrink-0 rounded-lg border border-white/15 object-cover shadow-lg sm:size-20"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold tracking-[0.16em] text-lime-100/78 uppercase">
                  {game.name} mission
                </p>
                <p className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {currentPage.title}
                </p>
                <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-white/62">
                  {currentPage.description}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-lime-300 px-4 text-sm font-bold text-emerald-950 transition-colors hover:bg-lime-200"
                href="/roblox/99-nights-in-the-forest/codes"
              >
                Current codes
              </Link>
              <a
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-white/18 bg-white/8 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/14"
                href={game.robloxUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Gamepad2 className="size-4" />
                Play Roblox
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        ) : null}

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          <Link
            className={cn(
              'inline-flex min-h-10 shrink-0 items-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
              isGameHub
                ? currentPage
                  ? 'border-lime-300 bg-lime-300 text-emerald-950'
                  : 'border-primary bg-primary text-primary-foreground'
                : currentPage
                  ? 'border-white/12 bg-white/8 text-white/76 hover:bg-white/14 hover:text-white'
                  : 'border-border bg-background hover:bg-accent'
            )}
            href={gameHref}
          >
            Guide hub
          </Link>
          {visiblePages.map((page) => {
            if (!page) return null;

            const active = normalizePath(page.href) === pathname;

            return (
              <Link
                className={cn(
                  'inline-flex min-h-10 shrink-0 items-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? currentPage
                      ? 'border-lime-300 bg-lime-300 text-emerald-950'
                      : 'border-primary bg-primary text-primary-foreground'
                    : currentPage
                      ? 'border-white/12 bg-white/8 text-white/76 hover:bg-white/14 hover:text-white'
                      : 'border-border bg-background hover:bg-accent'
                )}
                href={page.href}
                key={page.href}
              >
                {page.title}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
