import { client, deleteCookie } from '../../../shared';
import { ACCESS_TOKEN_COOKIE_NAME } from '../../../shared/config/token';

export const logoutApi = async () => {
  const response = await client.post('/member/logout');
  if (response.status === 200) {
    deleteCookie(ACCESS_TOKEN_COOKIE_NAME);

    delete client.defaults.headers.common['Authorization'];
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }

    return true;
  } else {
    console.error('Unexpected response status:', response.status);
    return false;
  }
};
