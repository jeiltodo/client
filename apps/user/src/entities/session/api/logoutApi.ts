import { client, deleteCookieToken } from '../../../shared';

export const logoutApi = async () => {
  const response = await client.post('/logout'); //임시api
  if (response.status === 200 || response.status === 204) {
    deleteCookieToken();

    delete client.defaults.headers.common['Authorization'];
    window.location.href = '/login';

    return true;
  } else {
    console.error('Unexpected response status:', response.status);
    return false;
  }
};
