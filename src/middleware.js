import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// ===== Create next-intl middleware =====
const nextIntlMiddleware = createMiddleware(routing);

// ===== Custom middleware logic =====
export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // ----- Redirect common misspellings -----
  const misspellings = {
    '/urohlogist': '/urologist',
    '/androlagy': '/andrology',
    '/kidny': '/kidney',
    '/prostat': '/prostate',
    '/doktor': '/doctors',
    '/dr-nazer': '/doctors/dr-nazir-shekari',
    '/dr-mansoor': '/doctors/dr-mansour-wayar',
    '/kabul-urologist': '/location/kabul',
  };

  for (const [wrong, correct] of Object.entries(misspellings)) {
    if (pathname.startsWith(wrong)) {
      return NextResponse.redirect(new URL(correct, request.url), 301);
    }
  }

  // ----- Force HTTPS in production -----
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    );
  }

  // ----- Apply next-intl middleware first -----
  const intlResponse = await nextIntlMiddleware(request);
  if (intlResponse) return intlResponse;

  // ----- Default response with security headers -----
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // SEO header
  response.headers.set('Content-Language', 'en');

  return response;
}

// ----- Matcher for Next.js middleware -----
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)', 
};