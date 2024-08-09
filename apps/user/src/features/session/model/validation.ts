import {
  loginApi,
  type LoginCredentials,
  signUpApi,
} from '../../../entities/session';

//회원가입
export const validateSiginupName = (name: string): string | undefined => {
  return name.trim() === '' ? '이름을 입력해 주세요.' : undefined;
};

export const validateSiginupEmail = async (email: string) => {
  const response = await signUpApi({ email });

  if ('msg' in response) {
    return response.msg;
  }

  return undefined;
};

export const validateSiginupPassword = (
  password: string
): string | undefined => {
  return password.length < 8
    ? '비밀번호가 8자 이상이 되도록 해 주세요.'
    : undefined;
};

export const validateSiginupConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined => {
  return password !== confirmPassword
    ? '비밀번호가 일치하지 않습니다.'
    : undefined;
};

//로그인 validation
export const validateLogIn = async (credentials: LoginCredentials) => {
  const response = await loginApi(credentials);
  if (response.code === 200) return null;
  if (response.code === 400) return '이메일 형식을 확인해주세요.';
  if (response.code === 200) return '가입되지 않은 이메일입니다.';
};
