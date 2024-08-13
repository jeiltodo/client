import Link from 'next/link';
import { type ChangeEvent, type FocusEvent, useEffect, useState } from 'react';
import { useDebounce, Button, Input } from '@jeiltodo/ui/shared';
import type { SignUpBody, ValidationErrors } from '../../../entities/session';
import {
  validateSiginupConfirmPassword,
  validateSiginupEmail,
  validateSiginupPassword,
  validateSignupNickname,
} from '../model/validation';

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
        error = validateSignupNickname(value);
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    <form onSubmit={handleSubmit}>
      <div className='w-[640px] flex flex-col gap-y-[24px] mb-[48px]'>
        <div className='h-[102px] flex flex-col gap-y-[12px]'>
          <label
            htmlFor='nickname'
            className='font-pretendard-semibold text-base'
          >
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
          {errors.nickname && (
            <p className='text-error pl-[24px] text-xs -mt-[10px]'>
              {errors.nickname}
            </p>
          )}
        </div>
        <div className='h-[102px] flex flex-col gap-y-[12px]'>
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
          {errors.email && (
            <p className='text-error pl-[24px] text-xs -mt-[10px]'>
              {errors.email}
            </p>
          )}
        </div>
        <div className='h-[102px] flex flex-col gap-y-[12px]'>
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
          {errors.password && (
            <p className='text-error pl-[24px] text-xs -mt-[10px] mb-4'>
              {errors.password}
            </p>
          )}
        </div>
        <div className='h-[102px] flex flex-col gap-y-[12px]'>
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
          {errors.confirmPassword && (
            <p className='text-error pl-[24px] text-xs -mt-[10px] mb-4'>
              {errors.confirmPassword}
            </p>
          )}
        </div>
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
