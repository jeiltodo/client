import { loginApi, type AuthBody, } from "../../../entities";

//로그인 validation
export const validateLogIn = async (credentials: AuthBody, isAdmin: boolean) => {
  const response = await loginApi(credentials, isAdmin);
  if (response.code === 200) return null;
  if (response.code === 400 && response.msg.includes('password'))
    return '비밀번호가 올바르지 않습니다.';
  if (response.code === 400 && response.msg.includes('email'))
    return '이메일 형식을 확인해주세요.';
  if (response.code === 404) return '가입되지 않은 이메일입니다.';
  if (response.code === 403) return '어드민 계정이 아닙니다.';
};
