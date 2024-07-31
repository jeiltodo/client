import { ChangeEvent, FocusEvent, useState } from 'react';
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

export const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
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

    validateField(e);
    const isValid = Object.values(errors).every((error) => !error);
    console.log('isValid: ', isValid);
    isValid ? setIsDisabled(false) : setIsDisabled(true);
  };

  const validateField = async (
    e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
  ) => {
    let error: string | undefined;
    const inputName = e.target.name;

    switch (inputName) {
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
    console.log('validation', error);

    setErrors((prev) => ({ ...prev, [inputName]: error }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    validateField(e);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      validateField(e);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password });
    // onSubmit({ name, email, password });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className='w-[640px] flex flex-col space-y-4 mb-[48px]'>
        <label htmlFor='name' className='font-pretendard-semibold text-base'>
          이름
        </label>
        <Input
          type='text'
          name='name'
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder='이름을 입력해주세요'
        />
        {errors.name && <p>{errors.name}</p>}
        <label htmlFor='name' className='font-pretendard-semibold text-base'>
          이메일
        </label>
        <Input
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder='이메일을 입력해주세요'
        />
        {errors.email && <p>{errors.email}</p>}
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
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder='비밀번호를 입력해주세요'
        />
        {errors.password && <p>{errors.password}</p>}
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
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder='비밀번호를 다시 한 번 입력해주세요'
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <Button
        variant='primary'
        isDisabled={isDisabled}
        className='w-full mb-[40px]'
      >
        회원가입하기
      </Button>
      <p className='text-center text-[15px]'>
        이미 회원이신가요?
        <Link
          href='/login'
          className='text-blue-500 font-pretendard-regular underline underline-offset-4 ml-1'
        >
          로그인
        </Link>
      </p>
    </form>
  );
};
