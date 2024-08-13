import { useMutation } from '@tanstack/react-query';
import { todoApi } from '../../../entities/todo';

export const useDeleteTodo = () =>
  useMutation({
    mutationFn: (id: number) => todoApi.deleteTodo(id),
  });
