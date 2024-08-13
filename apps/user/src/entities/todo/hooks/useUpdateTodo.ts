import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo, todoApi } from '../../../entities/todo';
import { goalQueryKeys } from '../../goal/hooks/queryKey';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTodo: Pick<Todo, 'id' | 'title'>) =>
      todoApi.updateTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: goalQueryKeys.individual.todos(),
      });
    },
  });
};
