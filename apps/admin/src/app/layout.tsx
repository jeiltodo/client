import './globals.css';
import '@jeiltodo/ui/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Sidebar } from '@jeiltodo/ui';
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
    <html lang='en'>
      <body className={inter.className}>
        <div className=''>
          <Sidebar />
          <main className=' pl-[80px] bg-gray-100 min-h-screen'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
