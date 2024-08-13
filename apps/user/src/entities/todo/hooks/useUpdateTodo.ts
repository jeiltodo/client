import { useMutation } from '@tanstack/react-query';
import { Todo, todoApi } from '../../../entities/todo';

export const useUpdateTodo = () =>
  useMutation({
    mutationFn: (newTodo: Pick<Todo, 'id' | 'title'>) =>
      todoApi.updateTodo(newTodo),
  });
