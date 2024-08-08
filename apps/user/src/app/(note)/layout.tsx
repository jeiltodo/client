import '../globals.css';
import '@jeiltodo/ui/styles.css';
import type { Metadata } from 'next';
import { SidebarUser } from '../../widgets/user';

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
          {children}
        </div>
      </body>
    </html>
  );
}
