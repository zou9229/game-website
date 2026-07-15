import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';

import { envConfigs } from '@/config';
import { getAllConfigs } from '@/modules/config/service';
import {
  isValidAdSensePublisherId,
  normalizeAdSenseClientId,
} from '@/lib/adsense';
import { Analytics } from '@/components/analytics';
import { CustomerService } from '@/components/customer-service';
import { GoogleOneTap } from '@/components/google-one-tap';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(envConfigs.app_url || 'https://questcodes.com'),
  title: envConfigs.app_name,
  description: envConfigs.app_description,
  keywords: [
    'Quest Codes',
    'Roblox codes',
    'working Roblox codes',
    'Roblox game guides',
    '99 Nights in the Forest codes',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: envConfigs.app_name,
    description: envConfigs.app_description,
    url: envConfigs.app_url,
    siteName: envConfigs.app_name,
    images: [
      {
        url: '/imgs/roblox/99-nights-thumbnail-1.jpg',
        width: 768,
        height: 432,
        alt: 'Official Roblox thumbnail for 99 Nights in the Forest',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: envConfigs.app_name,
    description: envConfigs.app_description,
    images: ['/imgs/roblox/99-nights-thumbnail-1.jpg'],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const configs = await getAllConfigs();
  const googleOneTapEnabled =
    configs.google_one_tap_enabled === 'true' && !!configs.google_client_id;
  const adsenseClientId =
    configs.google_adsense_enabled === 'true' &&
    isValidAdSensePublisherId(configs.google_adsense_publisher_id)
      ? normalizeAdSenseClientId(configs.google_adsense_publisher_id)
      : '';

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {adsenseClientId ? (
          <meta name="google-adsense-account" content={adsenseClientId} />
        ) : null}
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors />
          {googleOneTapEnabled ? (
            <GoogleOneTap
              configs={{
                google_one_tap_enabled: 'true',
                google_client_id: configs.google_client_id,
              }}
            />
          ) : null}
        </ThemeProvider>
        <Analytics configs={configs} />
        <CustomerService configs={configs} />
      </body>
    </html>
  );
}
