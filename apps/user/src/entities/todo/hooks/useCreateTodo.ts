import { useMutation } from '@tanstack/react-query';
import { todoApi, TodoCreateBody } from '../../../entities/todo';

export const useCreateTodo = () =>
  useMutation({
    mutationFn: (todoCreateBody: TodoCreateBody) =>
      todoApi.createTodo(todoCreateBody),
  });
