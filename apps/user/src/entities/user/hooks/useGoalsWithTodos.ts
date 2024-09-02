import { calculateTotalPages } from '@jeiltodo/ui/shared';
import { useInfiniteQuery } from '@tanstack/react-query';
import { goalQueryKeys } from '../../goal/hooks/queryKey';
import type { ResponsePageListWith } from '../../../shared/model/query/type';
import { individualGoalsApi } from '../../goal/api';
import type { GoalWithTodos } from '../../goal/model';

interface PageLimit {
  limit: number;
}

export const useGoalsWithTodos = ({ limit }: PageLimit) => {
  return useInfiniteQuery({
    queryKey: goalQueryKeys.individual.todos(),
    queryFn: ({ pageParam }) =>
      individualGoalsApi.getGoalWithTodos({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: ResponsePageListWith<{ goals: GoalWithTodos[] }>
    ) => {
      const {
        data: { totalCount, currentPage },
      } = lastPage;
      const totalPages = calculateTotalPages(totalCount, limit);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
