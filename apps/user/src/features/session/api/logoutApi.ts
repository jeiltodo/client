import client from '../../../shared/api/client';

export const logoutApi = async () => {
  return await client.post('/logout'); //임시api
};
