import { getTranslations } from 'next-intl/server';

import { SiteFooter, type FooterColumn } from '@/components/site-footer';

export async function Footer() {
  const t = await getTranslations('landing');

  const columns: FooterColumn[] = [
    {
      title: t('footer.feature'),
      links: [
        {
          label: t('footer.settings'),
          href: '/roblox/99-nights-in-the-forest',
        },
        {
          label: t('footer.admin'),
          href: '/roblox/99-nights-in-the-forest/codes',
        },
        {
          label: 'Class tier list',
          href: '/roblox/99-nights-in-the-forest/classes',
        },
      ],
    },
    {
      title: t('footer.resources'),
      links: [
        { label: 'About Quest Codes', href: '/about' },
        { label: 'Contact', href: '/contact' },
        {
          label: t('footer.docs'),
          href: '/roblox/99-nights-in-the-forest/updates',
        },
        {
          label: t('footer.github'),
          href: '/sitemap.xml',
          external: true,
        },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.privacy'), href: '/privacy-policy' },
        { label: t('footer.terms'), href: '/terms-of-service' },
        { label: 'Editorial Policy', href: '/editorial-policy' },
      ],
    },
  ];

  return <SiteFooter tagline={t('footer.tagline')} columns={columns} />;
}
