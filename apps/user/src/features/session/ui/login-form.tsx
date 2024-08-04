import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from 'react';
import { useDebounce } from '@jeiltodo/lib/hooks';
import { Button, Input } from '@jeiltodo/ui';
import { LoginCredentials, User } from '../types';
import { validateEmail, validateLogIn } from '../../../entities/session/model';
import { ValidationErrors } from '../../../entities/session/types';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const debouncedEmail = useDebounce(email, 2000);
  const debouncedPassword = useDebounce(password, 2000);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateField('email', email);
    validateField('password', password);
    onSubmit({ email, password });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;

    switch (inputName) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  };

  const validateField = async (inputName: string, value: string) => {
    let errorMessage: string | undefined;
    let loginResult: number | undefined;

    if (inputName === 'email') {
      errorMessage = await validateEmail(value);

      // 아이디 error message 처리
      if (!errorMessage) {
        errorMessage = '가입되지 않은 이메일입니다.';
      } else if (errorMessage === '이미 사용 중인 이메일입니다.') {
        errorMessage = undefined;
      }
    } else if (inputName === 'password') {
      loginResult = await validateLogIn({ email, password });

      // 비밀번호 error message 처리
      if (loginResult !== 200 && !errors.email) {
        errorMessage = '비밀번호가 올바르지 않습니다.';
      }
    }

    setErrors((prev) => ({ ...prev, [inputName]: errorMessage }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;
    validateField(inputName, value);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;
    setTimeout(() => {
      validateField(inputName, value);
    }, 1000);
  };

  useEffect(() => {
    debouncedEmail && validateField('email', debouncedEmail);
  }, [debouncedEmail]);

  useEffect(() => {
    debouncedPassword && validateField('password', debouncedPassword);
  }, [debouncedPassword]);

  useEffect(() => {
    const isValid = Object.values(errors).every((error) => !error);
    email && password && setIsDisabled(!isValid);
  }, [errors]);
  return (
    <form onSubmit={handleSubmit}>
      <div className='w-[640px] flex flex-col space-y-4 mb-[48px]'>
        <label htmlFor='email' className='font-pretendard-semibold text-base'>
          아이디
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
          <p className='text-slate-400 text-sm'>{errors.email}</p>
        )}
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
          className='mb-[48px]'
          placeholder='비밀번호를 입력해주세요'
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <Button
        variant='primary'
        isDisabled={isDisabled}
        className='w-full mb-[40px]'
      >
        로그인하기
      </Button>
    </form>
  );
};
