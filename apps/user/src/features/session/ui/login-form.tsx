import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, useToast } from '@jeiltodo/ui/shared';
import { validateLogIn } from '../model/validation';

export const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
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
      setErrors((prevErrors) => ({ ...prevErrors, email: errorMsg }));
    } else if (errorMsg.includes('비밀번호')) {
      setErrors((prevErrors) => ({ ...prevErrors, password: errorMsg }));
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
      <div className='w-[640px] flex flex-col space-y-4 mb-[48px]'>
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
          <p className='text-slate-400 text-sm'>{errors.email}</p>
        ) : null}
        <label
          className='font-pretendard-semibold text-base'
          htmlFor='password'
        >
          비밀번호
        </label>
        <Input
          className='mb-[48px]'
          name='password'
          onChange={handleChange}
          placeholder='비밀번호를 입력해주세요'
          type='password'
          value={password}
        />
        {errors.password ? <p>{errors.password}</p> : null}
      </div>
      <Button className='w-full mb-[40px]' variant='primary'>
        로그인하기
      </Button>
    </form>
  );
};
