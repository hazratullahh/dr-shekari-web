import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Redirect common misspellings
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
      return NextResponse.redirect(new URL(correct, request.url));
    }
  }
  
  // Force HTTPS in production
  if (process.env.NODE_ENV === 'production' && 
      request.headers.get('x-forwarded-proto') !== 'https') {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    );
  }
  
  // Add security headers
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
  
  // SEO headers
  response.headers.set('Content-Language', 'en');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};