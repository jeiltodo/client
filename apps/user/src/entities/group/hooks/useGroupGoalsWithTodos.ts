import { useInfiniteQuery } from '@tanstack/react-query';
import { calculateTotalPages } from '@jeiltodo/ui/shared';
import { goalQueryKeys } from '../../goal/hooks/queryKey';
import { groupGoalsApi } from '../../goal/api/groupGoalsApi';

interface Props {
  groupId: number;
  limit: number;
}

export const useGroupGoalsWithTodos = ({ groupId, limit }: Props) => {
  return useInfiniteQuery({
    queryKey: goalQueryKeys.group.todos(),
    queryFn: ({ pageParam }) =>
      groupGoalsApi.getGroupGoalsWithTodos(groupId, {
        page: pageParam,
        limit,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { totalCount, currPage } = lastPage.data;

      const totalPages = calculateTotalPages(totalCount, limit);
      return currPage < totalPages ? currPage + 1 : undefined;
    },
  });
};
