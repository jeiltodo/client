import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 보호된 경로 목록
const protectedRoutes = ['/', '/goal', '/group', '/note', '/todo'];

// 공개 경로 목록 (로그인하지 않아도 접근 가능한 경로)
const publicRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  console.log('유저 Middleware running');
  console.log('Request URL:', request.nextUrl.pathname);
  console.log('Token:', token);

  const path = request.nextUrl.pathname;

  // 보호된 경로에 접근하려 할 때 토큰이 없으면 로그인 페이지로 리다이렉트
  if (
    protectedRoutes.some(
      (route) => path === route || path.startsWith(`${route}/`)
    )
  ) {
    if (!token) {
      console.log('Redirecting to /login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 이미 로그인한 사용자가 로그인 또는 회원가입 페이지에 접근하려 할 때 홈페이지로 리다이렉트
  if (publicRoutes.includes(path)) {
    if (token) {
      console.log('Redirecting to /');
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // 다른 모든 경로에 대해서는 그대로 진행
  return NextResponse.next();
}

// 모든 경로에 대해 미들웨어 적용
export const config = {
  matcher: ['/'],
};
