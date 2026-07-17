import { redirect } from 'next/navigation';

import { defaultLocale } from '@/config/locale';

export default async function SignUpRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;

  redirect(`${localePrefix}/sign-in`);
}
