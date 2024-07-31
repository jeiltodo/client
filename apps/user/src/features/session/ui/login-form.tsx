import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Button, Input } from '@jeiltodo/ui';
import Link from 'next/link';
import { LoginCredentials } from '../model/sessionService';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ userId, password });
  };

  const onChangeId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit} className='w-[640px] flex flex-col space-y-4'>
      <label htmlFor='userId'>아이디</label>
      <Input
        type='text'
        name='userId'
        value={userId}
        onChange={onChangeId}
        placeholder='이메일을 입력해주세요'
      />
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
