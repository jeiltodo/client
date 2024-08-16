import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { groupQueryKeys } from './queryKeys';
import { groupApi } from '../api/groupApi';
import { GroupTitleOrCode } from '@jeiltodo/ui/entities';

export const useGroupCode = (id: number) => {
  return useQuery({
    queryKey: groupQueryKeys.code(id),
    queryFn: () => groupApi.reissueGroupoCode(id),
    select: (data) => data.data.secretCode,
  });
};

export const useGroupTitleAndCode = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupBody: GroupTitleOrCode) =>
      groupApi.updateGrouppTitleOrCode(id, groupBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('groups'),
      });
    },
  });
};
