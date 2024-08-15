import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../../../entities/todo';

export const useAssignTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todoId: number) => todoApi.assignTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('todos'),
      });
    },
  });
};
