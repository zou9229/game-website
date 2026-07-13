import type { MetadataRoute } from 'next';

import { locales } from '@/config/locale';
import { getBaseUrl } from '@/lib/seo';

const nonPublicPaths = [
  '/admin',
  '/settings',
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/redeem-invite',
];

export default function robots(): MetadataRoute.Robots {
  const localizedNonPublicPaths = locales.flatMap((locale) =>
    nonPublicPaths.map((path) => `/${locale}${path}`)
  );

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', ...nonPublicPaths, ...localizedNonPublicPaths],
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
