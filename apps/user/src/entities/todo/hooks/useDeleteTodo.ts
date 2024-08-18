import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../../../entities/todo';
import { useToast } from '@jeiltodo/ui/shared';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: (id: number) => todoApi.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('todos'),
      });
      showToast({ message: '할 일 삭제 성공!', type: 'alert' });
    },
  });
};
