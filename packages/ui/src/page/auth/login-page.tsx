'use client';

import Link from 'next/link';
import { LoginForm } from '../../features';
import Image from 'next/image';

interface LoginPageProps {
  type: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ type }) => {
  const showSignUpLink = type !== 'admin';

  return (
    <div className='flex flex-col items-center desktop:py-[120px] tablet:py-16 tablet:px-[52px] py-12 px-4'>
      <h1 className='mb-[60px] flex items-center gap-5'>
        <Image
          src={type === 'admin' ? '/admin/logo.png' : '/logo.png'}
          alt='Logo'
          width={180}
          height={50}
        />
        {!showSignUpLink && (
          <p
            className={`font-pretendard-semibold text-base text-[#3182F6] whitespace-nowrap overflow-hidden -mb-3`}
          >
            관리자 센터
          </p>
        )}
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
