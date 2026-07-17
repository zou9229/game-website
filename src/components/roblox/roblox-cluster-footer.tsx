import { getFeaturedRobloxGame } from '@/data/roblox-games';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Hammer,
  ShieldCheck,
} from 'lucide-react';

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

const visualRoutes = [
  {
    title: 'Check rewards first',
    description:
      'Copy current codes and keep special redemption paths separate from expired rewards.',
    href: '/roblox/99-nights-in-the-forest/codes',
    image: '/imgs/roblox/99-nights-thumbnail-1.jpg',
    label: 'Codes desk',
    icon: ShieldCheck,
  },
  {
    title: 'Plan the next craft',
    description:
      'Move from early navigation tools to recovery and late-run bench decisions.',
    href: '/roblox/99-nights-in-the-forest/crafting',
    image: '/imgs/roblox/99-nights-thumbnail-2.jpg',
    label: 'Crafting route',
    icon: Hammer,
  },
  {
    title: 'Route the next run',
    description:
      'Connect map movement, missing kids, Stronghold pressure, and survival priorities.',
    href: '/roblox/99-nights-in-the-forest/map',
    image: '/imgs/roblox/99-nights-thumbnail-3.jpg',
    label: 'Run planning',
    icon: Compass,
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

        <div className="grid gap-4 md:grid-cols-3">
          {visualRoutes.map((route) => {
            const Icon = route.icon;

            return (
              <Link
                className="quest-image-card group relative min-h-64 overflow-hidden rounded-lg border border-emerald-950/12 bg-zinc-950 shadow-sm"
                href={route.href}
                key={route.href}
              >
                <img
                  src={route.image}
                  alt={`${route.label} visual from 99 Nights in the Forest`}
                  className="quest-image-card-media absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/42 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-bold tracking-[0.12em] text-lime-100 uppercase backdrop-blur">
                    <Icon className="size-3.5" />
                    {route.label}
                  </span>
                  <h3 className="mt-3 text-xl font-black tracking-tight">
                    {route.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    {route.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 grid border-y border-emerald-950/10 md:grid-cols-2 lg:grid-cols-4 dark:border-white/10">
          {routeGroups.map((group) => (
            <div
              className="border-emerald-950/10 py-5 md:px-5 md:first:pl-0 lg:border-r lg:last:border-r-0 dark:border-white/10"
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
                      className="hover:bg-accent flex items-center justify-between gap-3 rounded-md px-2 py-2 text-sm transition-colors"
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
