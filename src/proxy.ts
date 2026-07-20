import { type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/core/i18n/config';

const intlMiddleware = createMiddleware(routing);

const UTM_COOKIE = 'utm_source';
const UTM_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export default function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  const utmSource = request.nextUrl.searchParams.get('utm_source');
  if (utmSource && !request.cookies.get(UTM_COOKIE)) {
    const sanitized = utmSource.replace(/[^\w.\-]/g, '').slice(0, 100);
    if (sanitized) {
      response.cookies.set(UTM_COOKIE, sanitized, {
        maxAge: UTM_COOKIE_MAX_AGE,
        path: '/',
        sameSite: 'lax',
      });
    }
  }
  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except API routes, static files, etc.
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
