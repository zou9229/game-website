import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/core/i18n/config';

const handleI18nRouting = createMiddleware(routing);
const nonIndexablePath = new RegExp(
  `^/(?:${routing.locales.join('|')}/)?(?:admin|settings)(?:/|$)`
);

export default function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);

  if (nonIndexablePath.test(request.nextUrl.pathname)) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except API routes, static files, etc.
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
