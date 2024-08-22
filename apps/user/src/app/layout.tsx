import './style/globals.css';
import '@jeiltodo/ui/styles.css';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { QueryProvider } from '../shared/model/query/query-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
          <ToastContainer />
          {children}
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryProvider>
      </body>
    </html>
  );
}
