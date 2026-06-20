import { envConfigs } from '@/config';
import { defaultLocale } from '@/config/locale';

type BreadcrumbItem = {
  name: string;
  item: string;
};

type FAQ = {
  question: string;
  answer: string;
};

export function getBaseUrl() {
  return (envConfigs.app_url || 'http://localhost:3000').replace(/\/$/, '');
}

export function ensureTrailingSlash(path: string) {
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

export function canonicalUrl(path: string, locale: string) {
  const normalizedPath = ensureTrailingSlash(
    path.startsWith('/') ? path : `/${path}`
  );
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
  return `${getBaseUrl()}${localePrefix}${normalizedPath}`;
}

export function currentMonthYear() {
  return new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function buildFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildVideoGameSchema({
  name,
  description,
  url,
  imageUrl,
  developer,
  genre,
  dateModified,
}: {
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  developer: string;
  genre: string;
  dateModified: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name,
    description,
    url,
    image: imageUrl,
    genre,
    dateModified,
    author: {
      '@type': 'Organization',
      name: developer,
    },
    isPartOf: {
      '@type': 'VideoGameSeries',
      name: 'Roblox',
      url: 'https://www.roblox.com/',
    },
  };
}
