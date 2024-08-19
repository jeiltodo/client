import { useQuery } from '@tanstack/react-query';
import { todoApi } from '../api/todoApi';
import { todoQueryKeys } from './queryKeys';

export const useSingleGoalTodo = <T>(goalId: number) => {
  return useQuery({
    queryKey: todoQueryKeys.list(goalId),
    queryFn: () => todoApi.getSingleGoalTodo<T>(goalId),
    select: (data) => data.data,
  });
};
