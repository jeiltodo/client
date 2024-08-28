import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 관리자 보호 경로 목록 (basePath 적용)
const protectedAdminRoutes = [
  '/',
  '/goals',
  '/group',
  '/members',
];

// 관리자 공개 경로 목록 (basePath 적용)
const publicAdminRoutes = ['/admin/login'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessAdminToken')?.value;
  const path = request.nextUrl.pathname;

  console.log('관리자 Middleware running');
  console.log('Request URL:', path);
  console.log('Token:', token);

  // 보호된 관리자 경로에 접근 시 토큰 체크
  if (protectedAdminRoutes.some(route => path === route || path.startsWith(`${route}/`))) {
    if (!token) {
      console.log('Redirecting to /admin/login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // 로그인한 관리자가 로그인 페이지에 접근하려 할 때 관리자 대시보드로 리다이렉트
  if (publicAdminRoutes.includes(path)) {
    if (token) {
      console.log('Redirecting to /admin');
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // 다른 모든 경로에 대해서는 그대로 진행
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
