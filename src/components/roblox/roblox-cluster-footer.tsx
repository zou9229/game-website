import { getFeaturedRobloxGame } from '@/data/roblox-games';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';

const routeGroups = [
  {
    title: 'Fast reward checks',
    description: 'Start here when you only need current rewards or updates.',
    links: ['Codes', 'Gems', 'Updates'],
  },
  {
    title: 'Crafting route',
    description: 'Plan materials before you spend rare resources.',
    links: ['Crafting', 'Crafting Bench 5', 'Bandages'],
  },
  {
    title: 'Run planning',
    description: 'Use these when you are routing locations and longer runs.',
    links: ['Map', 'Missing Kids', 'Stronghold', 'Survival Guide'],
  },
  {
    title: 'Class and taming',
    description: 'Compare unlock targets before spending diamonds.',
    links: ['Classes', 'Class Tier List', 'Animals', 'Taming Flute'],
  },
];

export function RobloxClusterFooter() {
  const game = getFeaturedRobloxGame();

  return (
    <section className="border-border/80 bg-muted/25 border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="text-primary mb-2 inline-flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="size-4" />
              Continue the {game.shortName} route
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Pick the next guide by what you are trying to solve.
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-6">
              Quest Codes keeps codes, crafting, route planning, classes, and
              updates connected so one answer can lead to the next decision.
            </p>
          </div>
          <Link
            className="border-border bg-background hover:bg-accent inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors"
            href={`/roblox/${game.slug}`}
          >
            Back to guide hub
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {routeGroups.map((group) => (
            <div
              className="bg-card rounded-lg border p-4 shadow-xs"
              key={group.title}
            >
              <h3 className="font-semibold">{group.title}</h3>
              <p className="text-muted-foreground mt-1 min-h-10 text-sm leading-5">
                {group.description}
              </p>
              <div className="mt-4 space-y-2">
                {group.links.map((title) => {
                  const page = game.pages.find((item) => item.title === title);
                  if (!page) return null;

                  return (
                    <Link
                      className="hover:bg-accent flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm transition-colors"
                      href={page.href}
                      key={page.href}
                    >
                      <span>{page.title}</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
