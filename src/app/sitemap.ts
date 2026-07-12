import type { MetadataRoute } from 'next';
import {
  ninetyNineNightsFreshnessEntries,
  type FreshnessEntry,
} from '@/data/99-nights-freshness';
import { robloxGames } from '@/data/roblox-games';

import { defaultLocale } from '@/config/locale';
import { ensureTrailingSlash, getBaseUrl } from '@/lib/seo';

function localizedUrl(path: string, locale: string) {
  const cleanPath =
    path === '/'
      ? '/'
      : ensureTrailingSlash(path.startsWith('/') ? path : `/${path}`);
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
  const codesCheck =
    freshnessByPath.get('/roblox/99-nights-in-the-forest/codes')?.checkedAt ??
    latestContentCheck;

  const englishContentRoutes = [
    {
      path: '/',
      priority: 1,
      changeFrequency: 'weekly' as const,
      lastModified: latestContentCheck,
    },
    {
      path: '/codes',
      priority: 0.9,
      changeFrequency: 'daily' as const,
      lastModified: codesCheck,
    },
    {
      path: '/roblox',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
      lastModified: latestContentCheck,
    },
  ];

  const staticRoutes = [
    {
      path: '/privacy-policy',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
      lastModified: '2026-07-12',
    },
    {
      path: '/terms-of-service',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
      lastModified: '2026-06-20',
    },
    {
      path: '/editorial-policy',
      priority: 0.4,
      changeFrequency: 'monthly' as const,
      lastModified: '2026-06-24',
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
        .filter((page) => page.status === 'live')
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
