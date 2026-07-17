import type { MetadataRoute } from 'next';
import {
  ninetyNineNightsFreshnessEntries,
  type FreshnessEntry,
} from '@/data/99-nights-freshness';
import { robloxGames } from '@/data/roblox-games';

import { defaultLocale } from '@/config/locale';
import { getBaseUrl } from '@/lib/seo';

const reviewOnlyPaths = new Set([
  '/roblox/99-nights-in-the-forest/classes',
  '/roblox/99-nights-in-the-forest/animals',
  '/roblox/99-nights-in-the-forest/survival-guide',
  '/roblox/99-nights-in-the-forest/updates',
]);

function localizedUrl(path: string, locale: string) {
  const prefixedPath = path.startsWith('/') ? path : `/${path}`;
  const cleanPath =
    prefixedPath === '/' ? '/' : prefixedPath.replace(/\/+$/, '');
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  return `${getBaseUrl()}${localePrefix}${cleanPath}`;
}

function asUtcDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function latestCheckedAt(entries: FreshnessEntry[]) {
  return (
    entries
      .map((entry) => entry.checkedAt)
      .sort()
      .at(-1) ?? '2026-06-20'
  );
}

function freshnessChangeFrequency(
  entry?: FreshnessEntry
): MetadataRoute.Sitemap[number]['changeFrequency'] {
  if (entry?.kind === 'codes' || entry?.kind === 'updates') return 'daily';
  return 'weekly';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const freshnessByPath = new Map(
    ninetyNineNightsFreshnessEntries.map((entry) => [entry.href, entry])
  );
  const latestContentCheck = latestCheckedAt(ninetyNineNightsFreshnessEntries);

  const englishContentRoutes = [
    {
      path: '/',
      priority: 1,
      changeFrequency: 'weekly' as const,
      lastModified: latestContentCheck,
    },
  ];

  const staticRoutes = [
    {
      path: '/about',
      priority: 0.4,
      changeFrequency: 'monthly' as const,
      lastModified: '2026-07-15',
    },
    {
      path: '/contact',
      priority: 0.4,
      changeFrequency: 'monthly' as const,
      lastModified: '2026-07-15',
    },
    {
      path: '/privacy-policy',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
      lastModified: '2026-07-17',
    },
    {
      path: '/terms-of-service',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
      lastModified: '2026-07-15',
    },
    {
      path: '/editorial-policy',
      priority: 0.4,
      changeFrequency: 'monthly' as const,
      lastModified: '2026-07-15',
    },
  ];

  const gameRoutes = robloxGames.flatMap((game) => {
    const gamePath = `/roblox/${game.slug}`;
    const gameFreshness = freshnessByPath.get(gamePath);

    return [
      {
        path: gamePath,
        priority: 0.9,
        changeFrequency: freshnessChangeFrequency(gameFreshness),
        lastModified: gameFreshness?.checkedAt ?? game.stats.checkedAt,
      },
      ...game.pages
        .filter(
          (page) => page.status === 'live' && !reviewOnlyPaths.has(page.href)
        )
        .map((page) => {
          const freshness = freshnessByPath.get(page.href);

          return {
            path: page.href,
            priority: 0.9,
            changeFrequency: freshnessChangeFrequency(freshness),
            lastModified: freshness?.checkedAt ?? game.stats.checkedAt,
          };
        }),
    ];
  });

  const englishUrls = [...englishContentRoutes, ...gameRoutes].map((route) => ({
    url: localizedUrl(route.path, defaultLocale),
    lastModified: asUtcDate(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const staticUrls = staticRoutes.map((route) => ({
    url: localizedUrl(route.path, defaultLocale),
    lastModified: asUtcDate(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...englishUrls, ...staticUrls];
}
