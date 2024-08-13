import { useQuery } from '@tanstack/react-query';
import { goalApi } from '../../../entities/goal/api/goalApi';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../shared';
import { goalQueryKeys } from './queryKey';

interface PageAndLimit {
  page?: number;
  limit?: number;
}

export const useGoalsWithTodos = (params: PageAndLimit = {}) => {
  const { page = PAGE_DEFAULT, limit = LIMIT_DEFAULT } = params;

  return useQuery({
    queryKey: goalQueryKeys.individual.todos(),
    queryFn: () => goalApi.getGoalWithTodos(page, limit),
    select: (data) => data.data.goals,
  });
};
