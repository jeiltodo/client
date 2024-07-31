import client from '../../../shared/api/client';
import { MessageResponse, SignUpData, SignUpResponse } from '../types';

export const signUpApi = async (
  signUpData: SignUpData
): Promise<SignUpResponse | MessageResponse> => {
  const response = await client.post('/auth/user', signUpData);
  console.log('response: ', response);

  if (response.data.status === 200) {
    return response.data as SignUpResponse;
  } else if (response.data.status === 400) {
    //이메일 형식 에러
    return response.data as MessageResponse;
  } else if (response.data.status === 409) {
    //이메일 중복
    return response.data as MessageResponse;
  } else {
    //에러
    return response.data;
  }
};
