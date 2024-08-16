import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi, TodoCreateBody } from '../../../entities/todo';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todoCreateBody: TodoCreateBody) =>
      todoApi.createTodo(todoCreateBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('todos'),
      });
    },
  });
};
