import { permanentRedirect } from 'next/navigation';

import { defaultLocale } from '@/config/locale';

export default async function ClassTierListRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;

  permanentRedirect(`${localePrefix}/roblox/99-nights-in-the-forest/classes`);
}
