import { useInfiniteQuery } from '@tanstack/react-query';
import { goalQueryKeys } from '../../goal/hooks/queryKey';
import { groupGoalsApi } from '../../goal/api/groupGoalsApi';
import { ResponsePageListWith } from '../../todo';
import { GroupGoalWithTodos } from '../../goal';

interface Props {
  groupId: number;
  limit: number;
}

interface PageInfo {
  totalCount: number;
  currPage: number;
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
      const { totalCount, currPage } = lastPage.data as PageInfo;

      const totalPages = calculateTotalPages(totalCount, limit);
      return currPage < totalPages ? currPage + 1 : undefined;
    },
  });
};

/*
////////////////////////////////////////////////////////////////////////////////
*/
function calculateTotalPages(totalCount: number, itemsPerPage: number): number {
  const fullPages = Math.floor(totalCount / itemsPerPage);
  const hasPartialPage = totalCount % itemsPerPage !== 0;
  return fullPages + (hasPartialPage ? 1 : 0);
}
