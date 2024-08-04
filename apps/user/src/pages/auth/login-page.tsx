'use client';
import { useRouter } from 'next/navigation';
import {
  LoginCredentials,
  sessionService,
  LoginForm,
} from '../../features/session';
import Link from 'next/link';

export const LoginPage: React.FC = () => {
  const router = useRouter();

  const onLogin = async (credentials: LoginCredentials) => {
    try {
      const success = await sessionService.login(credentials);

      if (success.status === 200) {
        router.push('/');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.log('로그인 에러', error);
    }
  };

  return (
    <div className='flex flex-col items-center py-[120px]'>
      <h1 className='mb-[60px]'>slid to-do</h1>
      <LoginForm onSubmit={onLogin} />
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
