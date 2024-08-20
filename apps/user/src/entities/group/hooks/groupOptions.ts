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

export const useGroupMutation = (onError: (_error: AxiosError) => void) => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: groupApi.createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.all });
      showToast({ message: '그룹 생성 성공!', type: 'alert', isGroup: true });
    },
    onError: onError,
  });
};

export const useGroupAttendMutation = (
  onError: (_error: AxiosError) => void
) => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: groupApi.attendGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.all });
      showToast({ message: '그룹 참여 성공!', type: 'alert', isGroup: true });
    },
    onError: onError,
  });
};
