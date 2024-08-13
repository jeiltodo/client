import { useMutation } from '@tanstack/react-query';
import { todoApi } from '../../../entities/todo';

export const useCheckTodo = () =>
  useMutation({
    mutationFn: (todoId: number) => todoApi.checkTodo(todoId),
  });
