'use client';

import Link from 'next/link';
import { LoginForm } from '../../features';
import { TempLogo } from '@jeiltodo/icons';

interface LoginPageProps {
  type: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ type }) => {
  const showSignUpLink = type !== 'admin';

  return (
    <div className='flex flex-col items-center desktop:py-[120px] tablet:py-16 tablet:px-[52px] py-12 px-4'>
      <h1 className='mb-[60px]'>
        <TempLogo width={210} />
      </h1>
      <LoginForm isAdmin={type === 'admin'} />
      {showSignUpLink && (
        <p className='text-center text-[15px]'>
          슬리드 투 두가 처음이신가요?
          <Link
            href='/signup'
            className='text-blue-500 font-pretendard-regular underline underline-offset-4 ml-1'
          >
            회원가입
          </Link>
        </p>
      )}
    </div>
  );
};
