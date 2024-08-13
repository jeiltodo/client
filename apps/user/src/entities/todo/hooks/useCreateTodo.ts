import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi, TodoCreateBody } from '../../../entities/todo';
import { goalQueryKeys } from '../../goal/hooks/queryKey';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todoCreateBody: TodoCreateBody) =>
      todoApi.createTodo(todoCreateBody),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: goalQueryKeys.individual.todos(),
      });
    },
  });
};
