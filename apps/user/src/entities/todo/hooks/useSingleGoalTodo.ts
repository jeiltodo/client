import { useQuery } from '@tanstack/react-query';
import { todoApi } from '../api/todoApi';
import { todoQueryKeys } from './queryKeys';

export const useSingleGoalTodo = (goalId: number) => {
  return useQuery({
    queryKey: [todoQueryKeys.individual.single(goalId), goalId],
    queryFn: () => todoApi.getSingleGoalTodo(goalId),
    select: (data) => data.data,
  });
};
