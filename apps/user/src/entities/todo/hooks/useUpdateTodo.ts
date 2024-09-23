import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@jeiltodo/ui/shared';
import type { Todo } from '../model';
import { todoApi } from '../api/todoApi';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: (newTodo: Pick<Todo, 'id' | 'title'>) =>
      todoApi.updateTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('todos'),
      });
      showToast({ message: '할 일 수정 성공!', type: 'alert' });
    },
  });
};
