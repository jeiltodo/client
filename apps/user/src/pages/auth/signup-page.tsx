'use client';
import { useRouter } from 'next/navigation';
import { SignUpData } from '../../entities/session';
import { signUpApi } from '../../entities/session/model';
import { SignUpForm } from '../../features/session/ui/signup-form';
import { Button, useToast } from '@jeiltodo/ui';
import { useCallback } from 'react';

export const SignUpPage: React.FC = () => {
  const router = useRouter();
  const showToast = useToast();

  const onSignUp = useCallback(
    async (credentials: SignUpData) => {
      try {
        const response = await signUpApi(credentials);
        showToast({ message: '가입이 완료되었습니다!', type: 'alert' });
        if ('id' in response) {
          router.push('/login');
        } else {
          console.log(response.message || 'Sign up failed. Please try again.');
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
