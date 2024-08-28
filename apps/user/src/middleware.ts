import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  console.log('유저 Middleware running');
  console.log('Request URL:', request.nextUrl.pathname);
  console.log('Token:', token);

  // 모든 페이지에서 토큰이 없으면 login 페이지로 리다이렉트
  if (!token) {
    if (request.nextUrl.pathname !== '/login') {
      console.log('Redirecting to /login due to missing token');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 로그인 페이지에서 토큰이 있으면 홈페이지로 리다이렉트
  if (request.nextUrl.pathname === '/login' && token) {
    console.log('Redirecting to / because token is present');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 기본적으로 다음 응답으로 계속 진행
  return NextResponse.next();
}

// 모든 경로에서 미들웨어가 동작하도록 설정
export const config = {
  matcher: ['/:path*'],
};
