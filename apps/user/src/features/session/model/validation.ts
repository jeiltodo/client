import {
  EmailDuplicateApi,
  loginApi,
  type LoginCredentials,
} from '../../../entities/session';

//회원가입
export const validateSignupNickname = (name: string): string | null => {
  if (name.trim() === '') {
    return '이름을 입력해 주세요.';
  } else if (name.trim().length > 8) {
    return '이름은 8자 이하로 작성해주세요.';
  }
  return null;
};

export const validateSiginupEmail = async (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    console.log('맞지않는', email);
    return '이메일 형식으로 입력해주세요';
  }

  const response = await EmailDuplicateApi(email);
  if (response.data?.is_duplicated) {
    return '이미 사용 중인 이메일입니다.';
  }

  return null;
};

export const validateSiginupPassword = (password: string): string | null => {
  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  if (!(password.trim().length >= 8)) {
    console.log('비밀번호가 8자 이상이 되도록 해 주세요.');
    return '비밀번호가 8자 이상이 되도록 해 주세요.';
  }

  if (!regex.test(password.trim())) {
    console.log('ddsggs');
    return '문자 + 숫자 + 기호를 조합한 8자 이상의 비밀번호를 작성해 주세요';
  }

  return null;
};

export const validateSiginupConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  return password !== confirmPassword ? '비밀번호가 일치하지 않습니다.' : null;
};

//로그인 validation
export const validateLogIn = async (credentials: LoginCredentials) => {
  const response = await loginApi(credentials);
  if (response.code === 200) return null;
  if (response.code === 400) return '이메일 형식을 확인해주세요.';
  if (response.code === 404) return '가입되지 않은 이메일입니다.';
};
