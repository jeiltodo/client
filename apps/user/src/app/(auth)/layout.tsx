import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USER AUTH | jeiltodo',
  description: 'jeiltodo 서비스의 인증 페이지입니다',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <main className='common-layout bg-white'>{children}</main>;
}
