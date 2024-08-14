import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi, TodoCreateBody } from '../../../entities/todo';
import { goalQueryKeys } from '../../goal/hooks/queryKey';

export const useSingleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (goalId: number) => todoApi.getSingleGoalTodo(goalId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: goalQueryKeys.individual.single(),
      });
    },
  });
};
