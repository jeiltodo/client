import { signUpApi } from '../api/signUpApi';
import { MessageResponse } from '../types';

export const validateName = (name: string): string | undefined => {
  return name.trim() === '' ? '이름을 입력해 주세요.' : undefined;
};

export const validateEmail = async (email: string) => {
  const response = await signUpApi({ email });

  if ('message' in response) {
    console.log(response.message);
    return (response as MessageResponse).message;
  }

  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  return password.length < 8
    ? '비밀번호가 8자 이상이 되도록 해 주세요.'
    : undefined;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined => {
  return password !== confirmPassword
    ? '비밀번호가 일치하지 않습니다.'
    : undefined;
};
