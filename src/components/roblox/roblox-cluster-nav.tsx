'use client';

import { getFeaturedRobloxGame } from '@/data/roblox-games';
import { ChevronRight, Home } from 'lucide-react';

import { Link, usePathname } from '@/core/i18n/navigation';
import { cn } from '@/lib/utils';

const priorityPageTitles = [
  'Codes',
  'Crafting',
  'Crafting Bench 5',
  'Bandages',
  'Classes',
  'Class Tier List',
  'Animals',
  'Map',
  'Missing Kids',
  'Stronghold',
  'Updates',
];

function normalizePath(pathname: string) {
  return pathname === '/' ? pathname : pathname.replace(/\/+$/, '');
}

export function RobloxClusterNav() {
  const pathname = normalizePath(usePathname());
  const game = getFeaturedRobloxGame();
  const gameHref = `/roblox/${game.slug}`;
  const isGameHub = pathname === gameHref;
  const currentPage = game.pages.find(
    (page) => normalizePath(page.href) === pathname
  );
  const visiblePages = priorityPageTitles
    .map((title) => game.pages.find((page) => page.title === title))
    .filter(Boolean);

  return (
    <div className="border-border/80 bg-muted/25 border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm"
        >
          <Link
            className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
            href="/"
          >
            <Home className="size-3.5" />
            Home
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <Link
            className="hover:text-foreground transition-colors"
            href="/roblox"
          >
            Roblox
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          {isGameHub ? (
            <span className="text-foreground font-medium">
              {game.shortName}
            </span>
          ) : (
            <Link
              className="hover:text-foreground transition-colors"
              href={gameHref}
            >
              {game.shortName}
            </Link>
          )}
          {currentPage ? (
            <>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <span className="text-foreground font-medium">
                {currentPage.title}
              </span>
            </>
          ) : null}
        </nav>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <Link
            className={cn(
              'shrink-0 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
              isGameHub
                ? 'border-primary bg-primary text-primary-foreground'
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
                  'shrink-0 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
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
    </div>
  );
}
