import Link from 'next/link';
import { type ChangeEvent, type FocusEvent, useEffect, useState } from 'react';
import { useDebounce, Button, Input } from '@jeiltodo/ui/shared';
import { VisibilityOff, VisibilityOn } from '@jeiltodo/icons';
import type { SignUpBody, ValidationErrors } from '../../../entities/session';
import {
  validateSiginupConfirmPassword,
  validateSiginupEmail,
  validateSiginupPassword,
  validateSignupNickname,
} from '../model/validation-signup';

interface SignUpFormProps {
  onSubmit: (credentials: SignUpBody) => void;
}

export const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const debouncedName = useDebounce(nickname, 1000);
  const debouncedEmail = useDebounce(email, 1000);
  const debouncedPassword = useDebounce(password, 1000);
  const debouncedConfirmPassword = useDebounce(confirmPassword, 1000);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name: inputName, value } = e.target;

    switch (inputName) {
      case 'nickname':
        setNickname(value);
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

  const validateField = async (inputName: string, value: string) => {
    let error: string | null;

    switch (inputName) {
      case 'nickname':
        error = await validateSignupNickname(value);
        break;
      case 'email':
        error = await validateSiginupEmail(value);
        break;
      case 'password':
        error = validateSiginupPassword(value);
        break;
      case 'confirmPassword':
        error = validateSiginupConfirmPassword(password, value);
        break;
    }

    setErrors((prev) => ({ ...prev, [inputName]: error }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;
    void validateField(inputName, value);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;
    setTimeout(() => {
      void validateField(inputName, value);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nickname, email, password });
  };

  // 디바운스된 값이 변할 때마다 유효성 검사 호출
  useEffect(() => {
    if (debouncedName) {
      void validateField('nickname', debouncedName);
    }
  }, [debouncedName]);

  useEffect(() => {
    if (debouncedEmail) {
      void validateField('email', debouncedEmail);
    }
  }, [debouncedEmail]);

  useEffect(() => {
    if (debouncedPassword) {
      void validateField('password', debouncedPassword);
    }
  }, [debouncedPassword]);

  useEffect(() => {
    if (debouncedConfirmPassword) {
      void validateField('confirmPassword', debouncedConfirmPassword);
    }
  }, [debouncedConfirmPassword]);

  const isValid =
    Object.values(errors).every((error) => !error) &&
    nickname.trim() &&
    email.trim() &&
    password.trim() &&
    confirmPassword.trim();

  useEffect(() => {
    setIsDisabled(!isValid);
  }, [errors, isValid]);

  return (
    <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'>
      <div className='w-full tablet:max-w-[640px] desktop:w-[640px] flex flex-col gap-y-3 mb-[48px]'>
        <label
          htmlFor='nickname'
          className='font-pretendard-semibold text-base'
        >
          이름
        </label>
        <div className='relative h-20'>
          <Input
            className='absolute left-0 top-0 w-full'
            type='text'
            name='nickname'
            value={nickname}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder='이름을 입력해주세요'
          />
          {errors.nickname && (
            <p className='absolute bottom-2 left-6 text-error text-xs'>
              {errors.nickname}
            </p>
          )}
        </div>
        <label htmlFor='name' className='font-pretendard-semibold text-base'>
          이메일
        </label>
        <div className='relative h-20'>
          <Input
            className='absolute left-0 top-0 w-full'
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder='이메일을 입력해주세요'
          />
          {errors.email && (
            <p className='absolute bottom-2 left-6 text-error text-xs'>
              {errors.email}
            </p>
          )}
        </div>
        <label
          htmlFor='password'
          className='font-pretendard-semibold text-base'
        >
          비밀번호
        </label>
        <div className='relative h-20'>
          <Input
            className='absolute left-0 top-0 w-full'
            type={isPasswordVisible ? 'text' : 'password'}
            name='password'
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder='비밀번호를 입력해주세요'
          />
          <div className='absolute w-[24px] h-[24px] right-[24px] top-4'>
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className={`absolute left-0 top-0 transition-opacity duration-200 ${
                isPasswordVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <VisibilityOn className='w-[20px] h-[20px]' />
            </button>

            <button
              type='button'
              onClick={togglePasswordVisibility}
              className={`absolute left-0 top-0 transition-opacity duration-200 ${
                !isPasswordVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <VisibilityOff className='w-[20px] h-[20px]' />
            </button>
          </div>
          {errors.password && (
            <p className='absolute bottom-2 left-6 text-error text-xs'>
              {errors.password}
            </p>
          )}
        </div>
        <label
          htmlFor='password'
          className='font-pretendard-semibold text-base'
        >
          비밀번호 확인
        </label>
        <div className='relative h-20'>
          <Input
            className='absolute left-0 top-0 w-full'
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder='비밀번호를 다시 한 번 입력해주세요'
          />
          <div className='absolute w-[24px] h-[24px] right-[24px] top-4'>
            <button
              type='button'
              onClick={toggleConfirmPasswordVisibility}
              className={`absolute left-0 top-0 transition-opacity duration-200 ${
                isConfirmPasswordVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <VisibilityOn className='w-[20px] h-[20px]' />
            </button>

            <button
              type='button'
              onClick={toggleConfirmPasswordVisibility}
              className={`absolute left-0 top-0 transition-opacity duration-200 ${
                !isConfirmPasswordVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <VisibilityOff className='w-[20px] h-[20px]' />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className='absolute bottom-2 left-6 text-error text-xs'>
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>
      <Button
        variant='primary'
        isDisabled={isDisabled}
        className='w-full max-w-[640px] mb-[40px]'
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
