import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupQueryKeys } from './queryKeys';
import { groupApi } from '../api/groupApi';

export const useGroupCodeUpdate = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: number) => groupApi.removeMember(id, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.detail(id) });
    },
  });
};
