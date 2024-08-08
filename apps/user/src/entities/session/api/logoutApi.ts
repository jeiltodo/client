import client from '../../../shared';

export const logoutApi = async () => {
  return await client.post('/logout'); //임시api
};
