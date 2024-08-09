'use client';
import { useRouter } from 'next/navigation';
import { SignUpForm } from '../../features/session/';
import { useCallback } from 'react';
import { signUpApi, SignUpData } from '../../entities/session';
import { useToast } from '@jeiltodo/ui/shared';

export const SignUpPage: React.FC = () => {
  const router = useRouter();
  const showToast = useToast();

  const onSignUp = useCallback(
    async (credentials: SignUpData) => {
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
    <div className='flex flex-col items-center py-[120px]'>
      <h1 className='mb-[40px]'>Slid to-do</h1>
      <SignUpForm onSubmit={onSignUp} />
    </div>
  );
};
