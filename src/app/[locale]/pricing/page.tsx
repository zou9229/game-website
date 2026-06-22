import { getTranslations, setRequestLocale } from 'next-intl/server';

import { filterPublicConfigs, getAllConfigs } from '@/modules/config/service';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { Pricing } from '@/blocks/pricing';

const pricingPublicConfigKeys = [
  'select_payment_enabled',
  'default_payment_provider',
  'stripe_enabled',
  'creem_enabled',
  'paypal_enabled',
  'alipay_enabled',
  'wechat_enabled',
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'landing.pricing' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const configs = filterPublicConfigs(
    await getAllConfigs(),
    pricingPublicConfigKeys
  );

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Pricing initialConfigs={configs} skipConfigFetch />
      </main>
      <Footer />
    </div>
  );
}
