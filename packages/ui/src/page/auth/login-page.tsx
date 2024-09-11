'use client';

import Link from 'next/link';
import { LoginForm } from '@jeiltodo/ui/features/user/ui';
import Image from 'next/image';

interface LoginPageProps {
  type: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ type }) => {
  const showSignUpLink = type !== 'admin';

  return (
    <div className='flex flex-col items-center desktop:py-[120px] tablet:py-16 tablet:px-[52px] py-12 px-4'>
      <h1 className='mb-[60px]'>
        <div className='flex items-center gap-5' style={{ height: '45px' }}>
          <Image
            alt='Logo'
            height={45}
            priority
            src={
              type === 'admin' ? '/admin/assets/logo.png' : '/assets/logo.png'
            }
            style={{ width: 'auto', height: '100%' }}
            width={180}
          />
          {!showSignUpLink && (
            <p className='font-pretendard-semibold text-base text-[#3182F6] whitespace-nowrap -mb-3'>
              관리자 센터
            </p>
          )}
        </div>
      </h1>
      <LoginForm isAdmin={type === 'admin'} />
      {showSignUpLink ? (
        <p className='text-center text-[15px]'>
          슬리드 투 두가 처음이신가요?
          <Link
            className='text-blue-500 font-pretendard-regular underline underline-offset-4 ml-1'
            href='/signup'
          >
            회원가입
          </Link>
        </p>
      ) : null}
    </div>
  );
};
