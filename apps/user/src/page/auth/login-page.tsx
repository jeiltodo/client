'use client';

import Link from 'next/link';
import { LoginForm } from '../../features/session';

export const LoginPage: React.FC = () => {
  return (
    <div className='flex flex-col items-center py-[120px]'>
      <h1 className='mb-[60px]'>slid to-do</h1>
      <LoginForm />
      <p className='text-center text-[15px]'>
        슬리드 투 두가 처음이신가요?
        <Link
          href='/signup'
          className='text-blue-500 font-pretendard-regular underline underline-offset-4 ml-1'
        >
          회원가입
        </Link>
      </p>
    </div>
  );
};
