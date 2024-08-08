import {
  signUpApi,
  type LoginCredentials,
  type LoginResponse,
  type MessageResponse,
  type SignUpData,
  type SignUpResponse,
} from '..';

export const sessionService = {
  signUp: async (
    signUpData: SignUpData
  ): Promise<SignUpResponse | MessageResponse | undefined> => {
    try {
      const response = await signUpApi(signUpData);
      console.log('sessionServiece response: ', response);
    } catch (error) {
      console.error('SignUp error:', error);
      throw error;
    }
  },
  login: async (credentials: LoginCredentials) => {
    try {
      // API 호출
      const response: AxiosResponse<LoginResponse | MessageResponse> =
        await loginApi(credentials);

      // 성공적인 응답 처리
      if (isLoginResponse(response)) {
        const authHeader = response.headers['authorization'];
        const accessToken = authHeader ? authHeader.split(' ')[1] : undefined;
        const refreshToken = response.data.user.refreshToken;

        console.log('accessToken: ', accessToken);
        console.log('refreshToken: ', refreshToken);
        // 성공적인 응답의 경우 토큰을 저장
        if (accessToken) {
          setCookieTokens('accessToken', accessToken);
        }
        if (refreshToken) {
          setCookieTokens('refreshToken', refreshToken);
        }

        console.log('session response: ', response);
        return response.data;
      } else {
        // 실패한 응답 처리
        // throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response: AxiosResponse<LoginResponse | MessageResponse> =
        await logoutApi();

      if (response.status === 200 || response.status === 204) {
        deleteCookieToken();

        delete client.defaults.headers.common['Authorization'];
        window.location.href = '/login';

        return true;
      } else {
        console.error('Unexpected response status:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  },
};
