import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { GroupTitleOrCode } from '@jeiltodo/ui/entities';
import { groupApi } from '../api';
import { groupQueryKeys } from './queryKeys';

export const useGroupCode = (groupId: number) => {
  return useQuery({
    queryKey: groupQueryKeys.code(groupId),
    queryFn: () => groupApi.reissueGroupCode(groupId),
    select: (data) => data.data.secretCode,
  });
};

export const useGroupTitleAndCode = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupBody: GroupTitleOrCode) =>
      groupApi.updateGroupTitleOrCode(groupId, groupBody),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('detail'),
      });
    },
  });
};
