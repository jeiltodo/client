import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessAdminToken')?.value;
  console.log('관리자 Middleware running');
  console.log('관리자 Middleware running');
  console.log('Request URL:', request.nextUrl.pathname);
  console.log('Token:', token);
  if (request?.nextUrl.pathname === '/') {
    console.log('토큰있나요? ', token);
    if (!token) {
      console.log('Redirecting to /login');
      return NextResponse.redirect(new URL('/login', origin));
    }
  }
  if (request?.nextUrl.pathname === '/login') {
    if (token) {
      console.log('Redirecting to /');
      return NextResponse.redirect(new URL('/', origin));
    }
  }
}
export const config = {
  matcher: ['/:path*'],
};
