import './globals.css';
import '@jeiltodo/ui/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SidebarUser } from '../widgets/user/ui/sidebar-user';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'USER | jeiltodo',
  description: 'jeiltodo 서비스의 유저 페이지입니다',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang='en'>
      <body className='font-pretendard-regular'>
        <div className=''>
          <SidebarUser />
          <main className='desktop:pl-[360px] tablet:pl-[84px]  tablet:pr-[24px] mobile:pl-[16px] mobile:pl-[16px] mobile:pr-[16px] bg-gray-100 min-h-screen'>
            <ToastContainer limit={1} />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
