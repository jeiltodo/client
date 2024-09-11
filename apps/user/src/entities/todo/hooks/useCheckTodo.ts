import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../api/todoApi';

export const useCheckTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todoId: number) => todoApi.checkTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('todos'),
      });
    },
  });
};
