import { client } from '../../../shared';
import {
  DuplicateResponse,
  LogoutData,
  UserData,
  UserInfoResponse,
  UserPatchResponse,
} from '../model/type';

export const userApi = {
  // 회원 정보 수정
  updateUserInfo: async (
    data: UserData,
    admin = false
  ): Promise<UserPatchResponse> => {
    const response = await client.patch('/member/info/update', data, {
      headers: admin ? { 'X-Admin-Request': 'true' } : {},
    });
    return response.data;
  },

  // 로그아웃
  logoutUserInfo: async (data: LogoutData, admin = false) => {
    const response = await client.post('/member/logout', data, {
      headers: admin ? { 'X-Admin-Request': 'true' } : {},
    });
    return response.data;
  },

  // 회원 탈퇴
  withdrawUserInfo: async (admin = false) => {
    const response = await client.delete('/member/withdraw', {
      headers: admin ? { 'X-Admin-Request': 'true' } : {},
    });
    return response.data;
  },

  // 닉네임 중복
  nicknameDuplicate: async (
    nickname: string,
    admin = false
  ): Promise<DuplicateResponse> => {
    const response = await client.get(`/member/nickname/duplicate`, {
      params: { nickname },
      headers: admin ? { 'X-Admin-Request': 'true' } : {},
    });
    return response.data;
  },

  // 이메일 중복
  emailDuplicate: async (
    email: string,
    admin = false
  ): Promise<DuplicateResponse> => {
    const response = await client.get(`/member/email/duplicate`, {
      params: { email },
      headers: admin ? { 'X-Admin-Request': 'true' } : {},
    });
    return response.data;
  },
};
