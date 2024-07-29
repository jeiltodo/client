import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value;

	//로그인을 하지 않아 토큰이 없으면 login페이지로 리다이렉트
	if (request.nextUrl.pathname === '/') {
		if (!token) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	}
	//로그인을 해서 토큰이 있으면 login페이지로 못가도록 홈페이지로 리다이렉트
	if (request.nextUrl.pathname === '/login') {
		if (token) {
			return NextResponse.redirect(new URL('/', request.url));
		}
	}

	return NextResponse.next();
}

//특정 path로만 해당 미들웨어가 동작
export const config = {
	matcher: ['/', '/login'],
};
