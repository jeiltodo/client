'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, useToast } from '@jeiltodo/ui/shared';
import { VisibilityOff, VisibilityOn } from '@jeiltodo/icons';
import { validateLogIn } from '../model';

interface LoginFormProps {
  isAdmin: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ isAdmin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    email: string | null;
    password: string | null;
  }>({
    email: null,
    password: null,
  });

  const router = useRouter();
  const showToast = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const errorMsg = await validateLogIn({ email, password }, isAdmin);
      if (errorMsg) {
        handleValidationErrors(errorMsg);
      } else {
        router.push('/');

        showToast({ message: '로그인 성공!', type: 'alert' });
      }
    } catch (error) {
      // 네트워크 에러 등 예외 처리
      //console.log대신 Sentry 추가
      console.error('Login error:', error);
    }
  };
  const handleValidationErrors = (errorMsg: string) => {
    if (errorMsg.includes('이메일')) {
      setErrors({ email: errorMsg, password: null });
    } else if (errorMsg.includes('비밀번호')) {
      setErrors({ email: null, password: errorMsg });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <form
      className='w-full flex flex-col items-center'
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
      <div className='w-full tablet:max-w-[640px] desktop:w-[640px] flex flex-col gap-y-3 mb-[48px]'>
        <label className='font-pretendard-semibold text-base' htmlFor='email'>
          아이디
        </label>
        <div className='relative h-20'>
          <Input
            className='absolute left-0 top-0 w-full'
            name='email'
            onChange={handleChange}
            placeholder='이메일을 입력해주세요'
            type='email'
            value={email}
          />
          {errors.email ? (
            <p className='absolute bottom-2 left-6 text-error text-xs'>
              {errors.email}
            </p>
          ) : null}
        </div>
        <label
          className='font-pretendard-semibold text-base'
          htmlFor='password'
        >
          비밀번호
        </label>
        <div className='relative h-20'>
          <Input
            className='absolute left-0 top-0 w-full'
            name='password'
            onChange={handleChange}
            placeholder='비밀번호를 입력해주세요'
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
          />
          <div className='absolute h-6 right-0 top-4'>
            <button
              className={`block pr-16 transition-opacity duration-200 ${
                isPasswordVisible ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={togglePasswordVisibility}
              type='button'
            >
              <VisibilityOn
                aria-label='비밀번호 보기'
                className='w-5 h-5 absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2'
              />
            </button>

            <button
              className={`block pr-16 transition-opacity duration-200 ${
                !isPasswordVisible ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={togglePasswordVisibility}
              type='button'
            >
              <VisibilityOff
                aria-label='비밀번호 가리기'
                className='w-5 h-5 absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2'
              />
            </button>
          </div>
          {errors.password ? (
            <p className='absolute bottom-2 left-6 text-error text-xs'>
              {errors.password}
            </p>
          ) : null}
        </div>
      </div>
      <Button
        className='w-full max-w-[640px] mb-[40px]'
        isDisabled={!email.trim() || !password.trim()}
        type='submit'
        variant='primary'
      >
        로그인하기
      </Button>
    </form>
  );
};
