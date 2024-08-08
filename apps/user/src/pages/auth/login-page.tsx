'use client';
import { useRouter } from 'next/navigation';
import { LoginForm } from '../../features/session';
import Link from 'next/link';
import { LoginCredentials, sessionService } from '../../entities/session';
import { client } from '../../shared';

export const LoginPage: React.FC = () => {
  const router = useRouter();

  const onLogin = async (credentials: LoginCredentials) => {
    const success = await client.post('/auth/login', credentials);
    console.log('success: ', success);

    if (success) {
      router.push('/');
    } else {
      alert('Login failed. Please try again.');
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
