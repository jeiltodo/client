import './style/globals.css';
import '@jeiltodo/ui/styles.css';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

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
        <ToastContainer limit={1} />
        {children}
      </body>
    </html>
  );
}
