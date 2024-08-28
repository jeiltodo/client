import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { groupApi } from '../api/groupApi';
import { groupQueryKeys } from './querykey';
import { groupApi as commonApi } from '../../../../../../packages/ui/src/entities/group/api/groupApi';
import { GroupTitleOrCode } from '@jeiltodo/ui/entities';

export const useGroupCode = (groupId: number) => {
  return useQuery({
    queryKey: groupQueryKeys.code(groupId),
    queryFn: () => commonApi.reissueGroupCode(groupId),
    select: (data) => data.data.secretCode,
  });
};

export const useGroupTitleAndCode = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupBody: GroupTitleOrCode) =>
      groupApi.updateGroupTitleOrCode(groupId, groupBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('groups'),
      });
    },
  });
};