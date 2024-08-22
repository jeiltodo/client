import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import { useToast } from '../../../shared';
import { userQueryKeys } from './queryKeys';
import { LogoutData, UserData } from '../model/type';
import { deleteCookie } from '../../../../../../apps/user/src/shared';

export const useUpdateUserInfoMutation = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: (data: UserData) => userApi.updateUserInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
      showToast({ message: '회원 정보가 수정되었습니다.', type: 'alert' });
    },
    onError: (error: Error) => {
      showToast({ message: '회원 정보 수정에 실패했습니다.', type: 'confirm' });
    },
  });
};

// 로그아웃
export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: (data: LogoutData) => userApi.logoutUserInfo(data),
    onSuccess: () => {
      queryClient.clear(); // 모든 쿼리 캐시를 지웁니다.
      deleteCookie('accessToken');
      deleteCookie('refreshToken');

      window.location.reload();
    },
    onError: (error: Error) => {
      showToast({ message: '로그아웃에 실패했습니다.', type: 'confirm' });
    },
  });
};

// 회원 탈퇴 (GET 요청이지만 상태를 변경하므로 mutation으로 유지)
export const useWithdrawMutation = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: userApi.withdrawUserInfo,
    onSuccess: () => {
      queryClient.clear(); // 모든 쿼리 캐시를 지웁니다.
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
    },
    onError: (error: Error) => {
      showToast({ message: '회원 탈퇴에 실패했습니다.', type: 'confirm' });
    },
  });
};

// 닉네임 중복 확인
export const useNicknameDuplicateQuery = (nickname: string) => {
  return useQuery({
    queryKey: userQueryKeys.nicknameDuplicate(nickname),
    queryFn: () => userApi.nicknameDuplicate(nickname),
  });
};

// 이메일 중복 확인
export const useEmailDuplicateQuery = (email: string) => {
  return useQuery({
    queryKey: userQueryKeys.emailDuplicate(email),
    queryFn: () => userApi.emailDuplicate(email),
  });
};
