import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { groupApi } from '../api/groupApi';
import { AxiosError } from 'axios';
import { groupQueryKeys } from './queryKeys';
import { useToast } from '@jeiltodo/ui/shared';

export const groupOptions = () =>
  queryOptions({
    queryKey: groupQueryKeys.all,
    queryFn: groupApi.getGroup,
  });

export const useGroupMutation = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: groupApi.createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.all });
      showToast({ message: '그룹 생성 성공!', type: 'alert' });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        showToast({ message: '이미 사용 중인 이름입니다.', type: 'confirm' });
      }
    },
  });
};

export const useGroupAttendMutation = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: groupApi.attendGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.all });
      showToast({ message: '그룹 참여 성공!', type: 'alert' });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        showToast({ message: '존재하지 않는 그룹입니다.', type: 'confirm' });
      }
      if (error.response?.status === 400) {
        showToast({ message: '이미 참여한 그룹입니다.', type: 'confirm' });
      }
    },
  });
};
