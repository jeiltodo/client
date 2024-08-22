import { EmailDuplicateApi, NicknameDuplicateApi } from "../../../entities/session";

//회원가입
export const validateSignupNickname = async (nickname: string) => {
  if (nickname.trim() === '') {
    return '이름을 입력해 주세요.';
  } else if (nickname.trim().length > 8) {
    return '이름은 8자 이하로 작성해주세요.';
  }

  const response = await NicknameDuplicateApi(nickname);
  if (response.data.duplicated) {
    return '이미 사용 중인 닉네임입니다.';
  }
  return null;
};

export const validateSiginupEmail = async (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return '이메일 형식으로 입력해주세요.';
  }

  const response = await EmailDuplicateApi(email);
  if (response.data.duplicated) {
    return '이미 사용 중인 이메일입니다.';
  }

  return null;
};

export const validateSiginupPassword = (password: string): string | null => {
  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
  if (!(password.trim().length >= 8)) {
    return '비밀번호가 8자 이상이 되도록 해 주세요.';
  }

  if (!regex.test(password.trim())) {
    return '문자 + 숫자 + 기호를 조합한 8자 이상의 비밀번호를 작성해 주세요.';
  }

  return null;
};

export const validateSiginupConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  return password !== confirmPassword ? '비밀번호가 일치하지 않습니다.' : null;
};