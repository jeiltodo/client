import { useInfiniteQuery } from '@tanstack/react-query';
import { individualGoalsApi } from '../api/individualGoalsApi';
import { goalQueryKeys } from './queryKey';

interface PageLimit {
  limit: number;
}

interface GoalWithTodosResponse {
  totalCount: number;
  currPage: number;
}

export const useGoalsWithTodos = ({ limit }: PageLimit) => {
  return useInfiniteQuery({
    queryKey: goalQueryKeys.individual.todos(),
    queryFn: ({ pageParam }) =>
      individualGoalsApi.getGoalWithTodos({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { totalCount, currPage } = lastPage.data as GoalWithTodosResponse;

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
