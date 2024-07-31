import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Button, Input } from '@jeiltodo/ui';
import Link from 'next/link';

import { LoginCredentials } from '../types';
import { validateEmail } from '../../../entities/session/model';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
}

interface ErrorMessages {
  id?: string;
  password?: string;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  const onChangeId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    const validationError = validateEmail(inputEmail);

    if (validationError) {
      setErrorMessages((prev) => ({ ...prev, userId: validationError }));
    }
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit} className='w-[640px] flex flex-col space-y-4'>
      <label htmlFor='email'>아이디</label>
      <Input
        type='email'
        name='email'
        value={email}
        onChange={onChangeId}
        placeholder='이메일을 입력해주세요'
      />
      {errorMessages.id && <p>{errorMessages.id}</p>}
      <label htmlFor='password'>비밀번호</label>
      <Input
        type='password'
        name='password'
        value={password}
        onChange={onChangePassword}
        className='mb-[48px]'
        placeholder='비밀번호를 입력해주세요'
      />
      <Button variant='primary' className='mb-[40px]'>
        로그인하기
      </Button>
      <p className='text-center'>
        슬리드 투 두가 처음이신가요?
        <Link
          href='/signup'
          className='text-blue-500 font-pretendard-regular underline underline-offset-4'
        >
          회원가입
        </Link>
      </p>
    </form>
  );
};
