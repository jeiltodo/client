'use client';
import { useRouter } from 'next/navigation';
import { SignUpData } from '../../entities/session';
import { signUpApi } from '../../entities/session/model';
import { SignUpForm } from '../../features/session/ui/signup-form';

export const SignUpPage: React.FC = () => {
  const router = useRouter();

  const onSignUp = async (credentials: SignUpData) => {
    const response = await signUpApi(credentials);
    if ('id' in response) {
      router.push('/login');
    } else {
      alert(response.message || 'Sign up failed. Please try again.');
    }
  };

  return (
    <div className='flex flex-col items-center py-[120px]'>
      <h1 className='mb-[40px]'>Slid to-do</h1>
      <SignUpForm onSubmit={onSignUp} />
    </div>
  );
};