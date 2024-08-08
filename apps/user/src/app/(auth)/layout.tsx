import '../globals.css';
import '@jeiltodo/ui/styles.css';
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
  return <div className='bg-white'>{children}</div>;
}
