import {
  getFeaturedRobloxGame,
  getLatestCodeCheckedAt,
} from '@/data/roblox-games';
import { ExternalLink } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { getLatestGameDataSourceCheck } from '@/modules/game-data-sync/service';

function toDateLabel(value?: string) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toISOString().slice(0, 10);
}

export async function RobloxSiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const featuredGame = getFeaturedRobloxGame();
  const latestCodeCheckedAt = getLatestCodeCheckedAt(featuredGame);
  const latestSourceCheck = await getLatestGameDataSourceCheck().catch(
    () => null
  );
  const sourceMonitorCheckedAt =
    toDateLabel(latestSourceCheck?.generatedAt) ?? latestCodeCheckedAt;

  return (
    <div className="quest-game-shell min-h-screen bg-[#edf4ed] text-emerald-950 dark:bg-[#07110d] dark:text-emerald-50 [&>main]:bg-transparent">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061611]/95 text-white shadow-md backdrop-blur">
        <div className="border-b border-lime-200/10 bg-[#0a2418]">
          <div className="mx-auto flex min-h-8 max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs text-white/58 sm:px-6 lg:px-8">
            <span>
              Source-checked Roblox guides, code history, and update notes.
            </span>
            <span>
              Editorial check {latestCodeCheckedAt}
              <span className="mx-1 text-white/28">/</span>
              Source monitor {sourceMonitorCheckedAt}
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
                src={envConfigs.app_logo}
                alt=""
                className="h-9 w-8 object-contain"
                aria-hidden="true"
              />
              <span>{envConfigs.app_name}</span>
            </Link>
            <div className="hidden h-8 border-l border-white/12 md:block" />
            <p className="hidden max-w-[260px] text-xs leading-5 text-white/54 md:block">
              Practical Roblox routes for players who need the answer now.
            </p>
          </div>

          <nav
            aria-label="Roblox guide navigation"
            className="flex flex-wrap items-center gap-1.5 text-sm"
          >
            <Link
              className="inline-flex min-h-10 items-center rounded-md px-2.5 py-1.5 text-white/64 transition-colors hover:bg-white/10 hover:text-white"
              href="/roblox"
            >
              Roblox
            </Link>
            <Link
              className="inline-flex min-h-10 items-center rounded-md px-2.5 py-1.5 text-white/64 transition-colors hover:bg-white/10 hover:text-white"
              href="/codes"
            >
              Codes
            </Link>
            <Link
              className="inline-flex min-h-10 items-center rounded-md px-2.5 py-1.5 text-white/64 transition-colors hover:bg-white/10 hover:text-white"
              href="/roblox/99-nights-in-the-forest/classes"
            >
              Tier Lists
            </Link>
            <Link
              className="inline-flex min-h-10 items-center rounded-md px-2.5 py-1.5 text-white/64 transition-colors hover:bg-white/10 hover:text-white"
              href="/roblox/99-nights-in-the-forest/updates"
            >
              Updates
            </Link>
            <Link
              className="inline-flex min-h-10 items-center rounded-md bg-lime-300 px-3 py-1.5 font-bold text-emerald-950 shadow-xs transition-colors hover:bg-lime-200"
              href="/roblox/99-nights-in-the-forest"
            >
              99 Nights hub
            </Link>
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-t border-white/10 bg-[#061611] text-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold">
              <img
                src={envConfigs.app_logo}
                alt=""
                className="h-7 w-6 object-contain"
                aria-hidden="true"
              />
              {envConfigs.app_name}
            </div>
            <p className="max-w-2xl leading-6 text-white/56">
              Fan-made Roblox codes and guide pages with visible source trails,
              checked dates, and practical internal links. Quest Codes is not
              affiliated with Roblox, the Roblox Corporation, or{' '}
              {featuredGame.developer}.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-2 md:justify-items-end">
            <Link
              className="text-white/58 hover:text-white"
              href="/roblox/99-nights-in-the-forest/codes"
            >
              Current 99 Nights codes
            </Link>
            <Link
              className="text-white/58 hover:text-white"
              href="/roblox/99-nights-in-the-forest"
            >
              99 Nights guide hub
            </Link>
            <Link className="text-white/58 hover:text-white" href="/about">
              About
            </Link>
            <Link className="text-white/58 hover:text-white" href="/contact">
              Contact
            </Link>
            <Link
              className="text-white/58 hover:text-white"
              href="/editorial-policy"
            >
              Editorial policy
            </Link>
            <Link
              className="text-white/58 hover:text-white"
              href="/privacy-policy"
            >
              Privacy policy
            </Link>
            <a
              className="inline-flex items-center gap-1 text-white/58 hover:text-white"
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
