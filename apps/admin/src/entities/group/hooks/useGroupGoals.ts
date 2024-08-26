import { groupQueryKeys } from './querykey';
import { groupApi } from '../api/groupApi';
import { useQuery } from '@tanstack/react-query';

export const useGroupGoals = ({
  page,
  limit,
  groupId,
}: {
  page: number;
  limit: number;
  groupId: number;
}) => {
  return useQuery({
    queryKey: groupQueryKeys.goals(groupId),
    queryFn: () => groupApi.getGroupGoals({ page, limit, groupId }),
    select: (data) => data,
  });
};
