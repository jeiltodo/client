import { loginApi, LoginCredentials } from '../../../features/session';
import { LoginResponse, User } from '../../../features/session/types';
import { signUpApi } from '../api/signUpApi';
import { MessageResponse } from '../types';

//회원가입
export const validateName = (name: string): string | undefined => {
  return name.trim() === '' ? '이름을 입력해 주세요.' : undefined;
};

export const validateEmail = async (email: string) => {
  const response = await signUpApi({ email });

  if ('message' in response) {
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

//로그인
function isLoginResponse(response: any): response is LoginResponse {
  return response && response.data && response.data.user;
}

export const validateLogIn = async (
  credentials: LoginCredentials
): Promise<User | undefined> => {
  const response = await loginApi(credentials);

  if (isLoginResponse(response)) {
    return response.data.user;
  }

  return undefined;
};
