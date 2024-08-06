import './globals.css';
import '@jeiltodo/ui/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SidebarAdmin } from '../widgets/sidebar/ui/sidebar-admin';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ADMIN | jeiltodo',
  description: 'jeiltodo 서비스의 어드민 페이지입니다',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <div className=''>
          <SidebarAdmin/>
          <main className='desktop:pl-[280px] tablet:pl-[60px] tablet:pt-0 mobile:pl-0 mobile:pt-[48px] bg-gray-100 min-h-screen'>{children}</main>
        </div>
      </body>
    </html>
  );
}
