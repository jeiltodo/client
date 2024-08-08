import { type ChangeEvent, type FocusEvent, useEffect, useState } from 'react';

import { Button, Input, useDebounce } from '@jeiltodo/ui/shared';

import Link from 'next/link';
import { SignUpData, ValidationErrors } from '../../../entities/session';
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../model/validation';

interface SignUpFormProps {
  onSubmit: (credentials: SignUpData) => void;
}

export const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const [nickname, setNickName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const debouncedName = useDebounce(nickname, 1000);
  const debouncedEmail = useDebounce(email, 1000);
  const debouncedPassword = useDebounce(password, 1000);
  const debouncedConfirmPassword = useDebounce(confirmPassword, 1000);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name: inputName, value } = e.target;

    switch (inputName) {
      case 'nickname':
        setNickName(value);
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

  // const validateField = async (inputName: string, value: string) => {
  //   let error: string | undefined;

  //   switch (inputName) {
  //     case 'name':
  //       error = validateName(value);
  //       break;
  //     case 'email':
  //       error = await validateEmail(value);
  //       break;
  //     case 'password':
  //       error = validatePassword(value);
  //       break;
  //     case 'confirmPassword':
  //       error = validateConfirmPassword(password, value);
  //       break;
  //   }

  //   setErrors((prev) => ({ ...prev, [inputName]: error }));
  // };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    // const { name: inputName, value } = e.target;
    console.log('e.target: ', e.target);
    // void validateField(inputName, value);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    // const { name: inputName, value } = e.target;
    // setTimeout(() => {
    //   void validateField(inputName, value);
    // }, 1000);
    console.log('e.target: ', e.target);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nickname, email, password });
  };

  // 디바운스된 값이 변할 때마다 유효성 검사 호출
  // useEffect(() => {
  //   if (debouncedName) {
  //     void validateField('name', debouncedName);
  //   }
  // }, [debouncedName]);

  // useEffect(() => {
  //   if (debouncedEmail) {
  //     void validateField('email', debouncedEmail);
  //   }
  // }, [debouncedEmail]);

  // useEffect(() => {
  //   if (debouncedPassword) {
  //     void validateField('password', debouncedPassword);
  //   }
  // }, [debouncedPassword]);

  // useEffect(() => {
  //   if (debouncedConfirmPassword) {
  //     void validateField('confirmPassword', debouncedConfirmPassword);
  //   }
  // }, [debouncedConfirmPassword]);

  // const isValid = Object.values(errors).every((error) => !error);

  // useEffect(() => {
  //   setIsDisabled(!isValid);
  // }, [errors, isValid]);

  return (
    <form onSubmit={handleSubmit}>
      <div className='w-[640px] flex flex-col space-y-4 mb-[48px]'>
        <label htmlFor='name' className='font-pretendard-semibold text-base'>
          이름
        </label>
        <Input
          type='text'
          name='nickname'
          value={nickname}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder='이름을 입력해주세요'
        />
        {/* {errors.name && ( 
          <p className='text-blue-400 text-sm -mt-[10px]'>{errors.name}</p>
        )}*/}
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
        {/* {errors.email && (
          <p className='text-blue-400 text-sm -mt-[10px]'>{errors.email}</p>
        )} */}
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
        {/* {errors.password && (
          <p className='text-blue-400 text-sm -mt-[10px] mb-4'>
            {errors.password}
          </p>
        )} */}
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
        {/* {errors.confirmPassword && (
          <p className='text-blue-400 text-sm -mt-[10px] mb-4'>
            {errors.confirmPassword}
          </p>
        )} */}
      </div>
      <Button variant='primary' isDisabled={false} className='w-full mb-[40px]'>
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
