import { client } from '../../../../../../apps/user/src/shared';
import {
  DuplicateResponse,
  LogoutData,
  UserData,
  UserInfoResponse,
  UserPatchResponse,
} from '../model/type';

export const userApi = {
  //회원 정보
  getUserInfo: async (): Promise<UserInfoResponse> => {
    try {
      const response = await client.get(`/member/info`);
      return response.data;
    } catch (error) {
      console.error('Fail fetch userInfo:', error);
      throw error;
    }
  },

  //회원 정보 수정
  updateUserInfo: async (data: UserData): Promise<UserPatchResponse> => {
    try {
      const response = await client.patch('/member/info/update', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //로그아웃
  logoutUserInfo: async (data: LogoutData) => {
    try {
      const response = await client.post('/member/logout', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //회원 탈퇴
  withdrawUserInfo: async () => {
    try {
      const response = await client.delete('/member/withdraw');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //닉네임 중복
  nicknameDuplicate: async (nickname: string): Promise<DuplicateResponse> => {
    try {
      const response = await client.get(`/member/nickname/duplicate`, {
        params: { nickname },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //이메일 중복
  emailDuplicate: async (email: string): Promise<DuplicateResponse> => {
    try {
      const response = await client.get(`/member/email/duplicate`, {
        params: { email },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
