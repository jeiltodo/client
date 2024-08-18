import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi, TodoCreateBody } from '../../../entities/todo';
import { useToast } from '@jeiltodo/ui/shared';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: (todoCreateBody: TodoCreateBody) =>
      todoApi.createTodo(todoCreateBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('todos'),
      });
      showToast({ message: '할 일 생성 성공!', type: 'alert' });
    },
  });
};
