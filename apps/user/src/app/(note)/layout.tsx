import '../globals.css';
import '@jeiltodo/ui/styles.css';
import type { Metadata } from 'next';
import { SidebarUser } from '../../widgets/user';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'USER NOTE | jeiltodo',
  description: 'jeiltodo 서비스의 유저의 노트 페이지입니다',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang='en'>
      <body className='font-pretendard-regular text-slate-800'>
        <div className=''>
          <SidebarUser />
          <main className='desktop:pl-[360px] tablet:pl-[84px]  tablet:pr-[24px] mobile:pl-[16px] mobile:pr-[16px] bg-white min-h-screen'>
            <ToastContainer limit={1} />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
