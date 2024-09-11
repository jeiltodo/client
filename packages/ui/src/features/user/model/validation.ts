import { type AuthBody, loginApi } from "../../../entities/user";


// 로그인 validation
export const validateLogIn = async (
  credentials: AuthBody,
  isAdmin: boolean
): Promise<string | null> => {
  try {
    const response = await loginApi(credentials, isAdmin);

    if (response.code === 200) return null;

    switch (response.code) {
      case 400:
        if (response.msg.includes('password'))
          return '비밀번호가 올바르지 않습니다.';
        if (response.msg.includes('email'))
          return '이메일 형식을 확인해주세요.';
        break;
      case 404:
        return '가입되지 않은 이메일입니다.';
      case 403:
        return '어드민 계정이 아닙니다.';
      default:
        return '알 수 없는 오류가 발생했습니다.';
    }
  } catch (error) {
    return '로그인 처리 중 오류가 발생했습니다.';
  }

  return '알 수 없는 오류가 발생했습니다.';
};
