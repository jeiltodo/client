import './style/globals.css';
import '@jeiltodo/ui/styles.css';
import type { Metadata } from 'next';
import { QueryProvider } from '../shared';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>
        <QueryProvider>
          <ToastContainer />
          {children}
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryProvider>
      </body>
    </html>
  );
}
