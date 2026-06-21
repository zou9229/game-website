import { getFeaturedRobloxGame } from '@/data/roblox-games';
import { ExternalLink } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';

export function RobloxSiteShell({ children }: { children: React.ReactNode }) {
  const featuredGame = getFeaturedRobloxGame();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-border/80 bg-card/95 sticky top-0 z-50 border-b shadow-sm backdrop-blur">
        <div className="border-primary/30 bg-primary/10 border-b">
          <div className="text-muted-foreground mx-auto flex min-h-8 max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs sm:px-6 lg:px-8">
            <span>
              Source-checked Roblox guides, code history, and update notes.
            </span>
            <span>
              {featuredGame.shortName} checked {featuredGame.stats.checkedAt}
            </span>
          </div>
        </div>

        <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
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
              <span>{envConfigs.app_name}</span>
            </Link>
            <div className="border-border hidden h-8 border-l md:block" />
            <p className="text-muted-foreground hidden max-w-[260px] text-xs leading-5 md:block">
              Practical Roblox routes for players who need the answer now.
            </p>
          </div>

          <nav
            aria-label="Roblox guide navigation"
            className="flex flex-wrap items-center gap-1.5 text-sm"
          >
            <Link
              className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-2.5 py-1.5 transition-colors"
              href="/roblox"
            >
              Roblox
            </Link>
            <Link
              className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-2.5 py-1.5 transition-colors"
              href="/codes"
            >
              Codes
            </Link>
            <Link
              className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-2.5 py-1.5 transition-colors"
              href="/roblox/99-nights-in-the-forest/class-tier-list"
            >
              Tier Lists
            </Link>
            <Link
              className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-2.5 py-1.5 transition-colors"
              href="/roblox/99-nights-in-the-forest/updates"
            >
              Updates
            </Link>
            <Link
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1.5 font-medium shadow-xs transition-colors"
              href="/roblox/99-nights-in-the-forest"
            >
              99 Nights hub
            </Link>
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-border/80 bg-card border-t">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold">
              <img
                src="/logo.png"
                alt=""
                className="h-7 w-6 object-contain"
                aria-hidden="true"
              />
              {envConfigs.app_name}
            </div>
            <p className="text-muted-foreground max-w-2xl leading-6">
              Fan-made Roblox codes and guide pages with visible source trails,
              checked dates, and practical internal links. Quest Codes is not
              affiliated with Roblox, the Roblox Corporation, or{' '}
              {featuredGame.developer}.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="/roblox/99-nights-in-the-forest/codes"
            >
              Current 99 Nights codes
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="/roblox/99-nights-in-the-forest"
            >
              99 Nights guide hub
            </Link>
            <a
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              href={featuredGame.robloxUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Official Roblox page
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
