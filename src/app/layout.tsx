import type { Metadata } from 'next';
import { Inter, Libre_Baskerville, Noto_Serif_SC } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';

import { envConfigs } from '@/config';
import { Analytics } from '@/components/analytics';
import { CustomerService } from '@/components/customer-service';
import { GoogleOneTap } from '@/components/google-one-tap';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif-display',
});
const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-serif-sc',
  preload: false,
});

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
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
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

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${libreBaskerville.variable} ${notoSerifSC.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors />
          <GoogleOneTap />
        </ThemeProvider>
        <Analytics />
        <CustomerService />
      </body>
    </html>
  );
}
