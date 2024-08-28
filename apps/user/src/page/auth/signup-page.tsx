'use client';
import { useRouter } from 'next/navigation';
import { signUpApi, SignUpBody } from '../../entities/session';
import { useToast } from '@jeiltodo/ui/shared';
import { useCallback } from 'react';
import { SignUpForm } from '../../features/session';
import Image from 'next/image';

export const SignUpPage: React.FC = () => {
  const router = useRouter();
  const showToast = useToast();

  const onSignUp = useCallback(
    async (credentials: SignUpBody) => {
      try {
        const response = await signUpApi(credentials);
        if (response.code === 201) {
          router.push('/login');
          showToast({ message: '가입이 완료되었습니다!', type: 'alert' });
        } else {
          console.log(response.msg || 'Sign up failed. Please try again.');
        }
      } catch (error) {
        console.error('Sign up failed:', error);
      }
    },
    [router, showToast]
  );

  return (
    <div className='flex flex-col items-center desktop:py-[120px] tablet:py-16 tablet:px-[52px] py-12 px-4'>
      <h1 className='mb-[60px]'>
        <Image src='/logo.png' alt='Logo' width={180} height={50} />
      </h1>
      <SignUpForm onSubmit={onSignUp} />
    </div>
  );
};
