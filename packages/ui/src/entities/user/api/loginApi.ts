import axios from 'axios';
import { client, ResponseWith, setCookie } from '../../../shared';
import { AuthBody, Token } from '../model/type';

export const loginApi = async (
  credentials: AuthBody,
  isAdmin: boolean // 어드민 여부를 판단하는 파라미터 추가
): Promise<ResponseWith<Token | null>> => {
  try {
    // 어드민 여부에 따라 요청 URL을 다르게 설정
    const url = isAdmin ? '/admin/member/signin' : '/member/signin';

    const response = await client.post<ResponseWith<Token | null>>(
      url,
      credentials
    );

    const accessToken = response.data.data?.accessToken;
    const refreshToken = response.data.data?.refreshToken;

    const accessTokenName = isAdmin ? 'accessAdminToken' : 'accessToken';
    const refreshTokenName = isAdmin ? 'refreshAdminToken' : 'refreshToken';

    if (accessToken && refreshToken) {
      setCookie(accessTokenName, accessToken);
      setCookie(refreshTokenName, refreshToken);
    }
    return Promise.resolve(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return Promise.resolve(error.response.data); // 오류를 포함한 응답 반환
      }
    }
    return Promise.reject(
      new Error('Network error or unexpected error occurred')
    ); // 네트워크 오류 등 처리할 수 없는 오류는 reject
  }
};
