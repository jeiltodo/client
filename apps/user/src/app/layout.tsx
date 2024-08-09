import './style/globals.css';
import '@jeiltodo/ui/styles.css';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { QueryProvider } from '../shared/model/query/query-provider';
import { SidebarUser } from '../widgets/user';

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
        <QueryProvider>
          <div className=''>
            <SidebarUser />
            <main className='desktop:pl-[280px] tablet:pl-[60px] tablet:pt-0 mobile:pl-0 mobile:pt-[48px] bg-gray-100 min-h-screen'>
              <ToastContainer limit={1} />
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
