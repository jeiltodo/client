import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, useToast } from '@jeiltodo/ui/shared';
import { validateLogIn } from '../model/validation';

export const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
      const errorMsg = await validateLogIn({ email, password });
      if (errorMsg) {
        handleValidationErrors(errorMsg);
      } else {
        router.push('/');
        showToast({ message: '로그인 성공!', type: 'alert' });
      }
    } catch (error) {
      // 네트워크 에러 등 예외 처리
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
  return (
    <form onSubmit={handleSubmit}>
      <div className='w-[640px] flex flex-col gap-y-[24px] mb-[48px]'>
        <div className='h-[102px] flex flex-col gap-y-[12px]'>
          <label className='font-pretendard-semibold text-base' htmlFor='email'>
            아이디
          </label>
          <Input
            name='email'
            onChange={handleChange}
            placeholder='이메일을 입력해주세요'
            type='email'
            value={email}
          />
          {errors.email ? (
            <p className='text-error pl-[24px] text-xs -mt-[10px]'>
              {errors.email}
            </p>
          ) : null}
        </div>
        <div className='h-[102px] flex flex-col gap-y-[12px]'>
          <label
            className='font-pretendard-semibold text-base'
            htmlFor='password'
          >
            비밀번호
          </label>
          <Input
            name='password'
            onChange={handleChange}
            placeholder='비밀번호를 입력해주세요'
            type='password'
            value={password}
          />
          {errors.password ? (
            <p className='text-error pl-[24px] text-xs -mt-[10px]'>
              {errors.password}
            </p>
          ) : null}
        </div>
      </div>
      <Button
        className='w-full mb-[40px]'
        isDisabled={!email.trim() || !password.trim()}
        variant='primary'
      >
        로그인하기
      </Button>
    </form>
  );
};
