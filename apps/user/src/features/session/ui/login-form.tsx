import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from '@jeiltodo/lib/hooks';
import { Button, Input } from '@jeiltodo/ui';
import { VisibilityOff, VisibilityOn } from '@jeiltodo/icons';
import type { LoginCredentials } from '../types';
import { validateEmail, validateLogIn } from '../../../entities/session/model';
import type { ValidationErrors } from '../../../entities/session/types';
interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const debouncedEmail = useDebounce(email, 2000);
  const debouncedPassword = useDebounce(password, 2000);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await validateField('email', email);
      await validateField('password', password);
    } catch {
      return;
    }
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

  const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;
    try {
      await validateField(inputName, value);
    } catch (error) {
      console.error('Error validating field:', error);
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;
    setTimeout(() => {
      validateField(inputName, value).catch((error) => {
        console.error('Error validating field:', error);
      });
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  useEffect(() => {
    debouncedEmail &&
      validateField('email', debouncedEmail).catch((error) => {
        console.error('Error validating field:', error);
      });
  }, [debouncedEmail]);

  useEffect(() => {
    debouncedPassword &&
      validateField('password', debouncedPassword).catch((error) => {
        console.error('Error validating field:', error);
      });
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
        <div className='relative h-[96px]'>
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
            <p className='absolute bottom-[16px] left-2 text-error text-sm'>
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
        <div className='relative h-[96px]'>
          <Input
            className='absolute left-0 top-0 w-full'
            name='password'
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder='비밀번호를 입력해주세요'
          />
          <div className='absolute w-[24px] h-[24px] right-[24px] top-3'>
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className={`absolute left-0 top-0 transition-opacity duration-200 ${
                isPasswordVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <VisibilityOn className='w-[24px] h-[24px]' />
            </button>

            <button
              type='button'
              onClick={togglePasswordVisibility}
              className={`absolute left-0 top-0 transition-opacity duration-200 ${
                !isPasswordVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <VisibilityOff className='w-[24px] h-[24px]' />
            </button>
          </div>
          {errors.password && (
            <p className='absolute bottom-[16px] left-2 text-error text-sm'>
              {errors.password}
            </p>
          )}
        </div>
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
