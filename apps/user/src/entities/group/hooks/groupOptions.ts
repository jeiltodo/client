import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { groupApi } from '../api/groupApi';
import { AxiosError } from 'axios';
import { groupQueryKeys } from './queryKeys';

export const groupOptions = () =>
  queryOptions({
    queryKey: groupQueryKeys.all,
    queryFn: groupApi.getGroup,
  });

export const useGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groupApi.createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.all });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        alert('이미 사용 중인 이름입니다.');
      }
    },
  });
};

export const useGroupAttendMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groupApi.attendGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.all });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        alert('없는 그룹입니다.');
      }
      if (error.response?.status === 400) {
        alert('이미 참여한 그룹입니다.');
      }
    },
  });
};
