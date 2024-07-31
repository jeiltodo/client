import client, {
  deleteCookieToken,
  setCookieTokens,
} from '../../../shared/api/client';
import { loginApi } from '../api/loginApi';
import { logoutApi } from '../api/logoutApi';
import { refreshTokenApi } from '../api/refreshTokenApi';
import { ApiResponse, LoginCredentials } from '../types';

export const sessionService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response: ApiResponse = await loginApi(credentials);

      setCookieTokens('accessToken', response.data.accessToken);
      setCookieTokens('refreshToken', response.data.refreshToken);

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response: ApiResponse = await logoutApi();

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

  refreshToken: async () => {
    try {
      const response = await refreshTokenApi();

      setCookieTokens('accessToken', response.data.accessToken);
      setCookieTokens('refreshToken', response.data.refreshToken);

      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },
};
