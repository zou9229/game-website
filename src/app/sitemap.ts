import type { MetadataRoute } from 'next';
import { robloxGames } from '@/data/roblox-games';

import { defaultLocale, locales } from '@/config/locale';
import { ensureTrailingSlash, getBaseUrl } from '@/lib/seo';

function localizedUrl(path: string, locale: string) {
  const cleanPath =
    path === '/'
      ? '/'
      : ensureTrailingSlash(path.startsWith('/') ? path : `/${path}`);
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  return `${getBaseUrl()}${localePrefix}${cleanPath}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const englishContentRoutes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/codes', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/roblox', priority: 0.9, changeFrequency: 'daily' as const },
  ];

  const localizedStaticRoutes = [
    {
      path: '/privacy-policy',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    {
      path: '/terms-of-service',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
  ];

  const gameRoutes = robloxGames.flatMap((game) => [
    {
      path: `/roblox/${game.slug}`,
      priority: 0.9,
      changeFrequency: 'daily' as const,
    },
    ...game.pages
      .filter((page) => page.status === 'live')
      .map((page) => ({
        path: page.href,
        priority: 0.9,
        changeFrequency: 'daily' as const,
      })),
  ]);

  const englishUrls = [...englishContentRoutes, ...gameRoutes].map((route) => ({
    url: localizedUrl(route.path, defaultLocale),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const localizedStaticUrls = locales.flatMap((locale) =>
    localizedStaticRoutes.map((route) => ({
      url: localizedUrl(route.path, locale),
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  );

  return [...englishUrls, ...localizedStaticUrls];
}
