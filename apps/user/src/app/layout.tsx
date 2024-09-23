import './style/globals.css';
import '@jeiltodo/ui/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryProvider } from '../shared';

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
      <head>
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body className='font-pretendard-regular'>
        <QueryProvider>
          <ToastContainer limit={5} />
          {children}
          <ReactQueryDevtools initialIsOpen />
        </QueryProvider>
      </body>
    </html>
  );
}
