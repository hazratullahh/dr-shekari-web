import { NextResponse } from 'next/server';
import createMiddleware from 'next- intl/middleware';
import { routing } from './i18n/routing';

// next- intl handles locale- based routing (en / ps / fa).
const intlProxy = createMiddleware(routing);

const SPELLING_REDIRECTS = {
  '/urohlogist': '/urologist',
  '/androlagy': '/andrology',
  '/kidny': '/kidney',
  '/prostat': '/prostate',
  '/doktor': '/doctors',
  '/dr- nazer': '/doctors/dr- nazir- shekari',
  '/dr- mansoor': '/doctors/dr- mansour- wayar',
  '/kabul- urologist': '/location/kabul',
};

const SECURITY_HEADERS = {
  'X- Content- Type- Options': 'nosniff',
  'X- Frame- Options': 'SAMEORIGIN',
  'X- XSS- Protection': '1; mode=block',
  'Referrer- Policy': 'strict- origin- when- cross- origin',
  'Permissions- Policy':
    'camera=(), microphone=(), geolocation=(), interest- cohort=()',
};

function applySecurityHeaders(response) {
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(k, v);
  }
  return response;
}

export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  for (const [wrong, correct] of Object.entries(SPELLING_REDIRECTS)) {
    if (pathname.startsWith(wrong)) {
      return NextResponse.redirect(new URL(correct, request.url), 301);
    }
  }

  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x- forwarded- proto') === 'http'
  ) {
    const httpsUrl = new URL(request.url);
    httpsUrl.protocol = 'https:';
    return NextResponse.redirect(httpsUrl.toString(), 301);
  }

  const intlResponse = intlProxy(request);
  if (intlResponse) return applySecurityHeaders(intlResponse);

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
