import { useQuery } from '@tanstack/react-query';
import { memberApi } from '../api/memberApi';
import { membersQueryKeys } from './queryKeys';

export const useGetMembers = (params: {
  page: number;
  limit: string | number;
  nickname?: string;
  title?: string;
  createdAfter?: string;
  createdBefore?: string;
}) => {
  return useQuery({
    queryKey: membersQueryKeys.filters(params),
    queryFn: () => memberApi.getMemberList(params),
    select: (data) => data.data,
  });
};
