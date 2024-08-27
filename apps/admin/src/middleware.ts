import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessAdminToken')?.value;
  console.log('관리자 Middleware running');
  console.log('관리자 Middleware running');
  console.log('Request URL:', request.nextUrl.pathname);
  console.log('Token:', token);
  if (request?.nextUrl.pathname === '/admin') {
    console.log('토큰있나요? ', token);
    if (!token) {
      console.log('Redirecting to /login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  if (request?.nextUrl.pathname === '/admin/login') {
    if (token) {
      console.log('Redirecting to /');
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
}
export const config = {
  matcher: ['/:path*'],
};
