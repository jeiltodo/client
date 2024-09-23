import './style/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import '@jeiltodo/ui/styles.css';

import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryProvider } from '../shared';

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
      <head>
        <link href='/favicon.ico' rel='icon' />
      </head>
      <body className='bg-slate-100'>
        <QueryProvider>
          <ToastContainer limit={5} />
          {children}
          <ReactQueryDevtools initialIsOpen />
        </QueryProvider>
      </body>
    </html>
  );
}
