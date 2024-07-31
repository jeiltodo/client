import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Button, Input } from '@jeiltodo/ui';
import Link from 'next/link';
import { SignUpData } from '../../../entities/session';
import { ValidationErrors } from '../../../entities/session/types';
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../../../entities/session/model';

interface SignUpFormProps {
  onSubmit: (credentials: SignUpData) => void;
}

export const SignUpForm = (onSubmit: SignUpFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (field: string) => (value: string) => {
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
    }
  };

  const validateField = async (field: string) => {
    let error: string | undefined;

    switch (field) {
      case 'name':
        error = validateName(name);
        break;
      case 'email':
        error = await validateEmail(email);
        break;
      case 'password':
        error = validatePassword(password);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(password, confirmPassword);
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await Promise.all(
      ['name', 'email', 'password', 'confirmPassword'].map(validateField)
    );

    // 모든 필드가 유효한지 확인
    const isValid = Object.values(errors).every((error) => !error);

    if (isValid) {
      // 여기에 폼 제출 로직을 추가합니다.
      console.log('Form is valid. Submitting...', { name, email, password });
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='w-[640px] flex flex-col space-y-4 mb-[48px]'>
        <label htmlFor='name' className='font-pretendard-semibold text-base'>
          이름
        </label>
        <Input
          type='text'
          name='name'
          value={name}
          onChange={() => handleChange('name')}
          onBlur={() => validateField('name')}
          placeholder='이름을 입력해주세요'
        />
        <label htmlFor='name' className='font-pretendard-semibold text-base'>
          이메일
        </label>
        <Input
          type='email'
          name='email'
          value={email}
          onChange={() => handleChange('email')}
          placeholder='이메일을 입력해주세요'
        />
        <label
          htmlFor='password'
          className='font-pretendard-semibold text-base'
        >
          비밀번호
        </label>
        <Input
          type='password'
          name='password'
          value={password}
          onChange={() => handleChange('password')}
          placeholder='비밀번호를 입력해주세요'
        />
        <label
          htmlFor='password'
          className='font-pretendard-semibold text-base'
        >
          비밀번호 확인
        </label>
        <Input
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={() => handleChange('confirmPassword')}
          placeholder='비밀번호를 다시 한 번 입력해주세요'
        />
      </div>
      <Button variant='primary' className='mb-[40px] w-full'>
        회원가입하기
      </Button>
      <p className='text-center'>
        이미 회원이신가요?
        <Link
          href='/login'
          className='text-blue-500 font-pretendard-regular underline underline-offset-4'
        >
          로그인
        </Link>
      </p>
    </form>
  );
};
