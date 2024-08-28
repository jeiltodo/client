import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessAdminToken')?.value;

  console.log('관리자 Middleware running');
  console.log('Request URL:', request.nextUrl.pathname);
  console.log('Token:', token);

  // 관리자 페이지에 접근할 때 토큰이 없는 경우 로그인 페이지로 리다이렉트
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('토큰있나요? ', token);
    if (!token && request.nextUrl.pathname !== '/admin/login') {
      console.log('Redirecting to /admin/login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // 이미 로그인된 상태에서 /admin/login 페이지에 접근하면 /admin으로 리다이렉트
    if (token && request.nextUrl.pathname === '/admin/login') {
      console.log('Redirecting to /admin');
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // 기본적으로 다음 응답으로 계속 진행
  return NextResponse.next();
}

// /admin 경로 및 하위 경로에서만 미들웨어가 동작하도록 설정
export const config = {
  matcher: ['/admin/:path*'],
};
