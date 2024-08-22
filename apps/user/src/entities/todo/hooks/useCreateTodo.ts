import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  ResponseGroupTodoCreate,
  ResponseTodoCreate,
  TodoCreateBody,
} from '..';
import { todoApi } from '..';
import { useToast } from '@jeiltodo/ui/shared';

export const useCreateTodo = (shouldCharge?: boolean) => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  return useMutation({
    mutationFn: (todoCreateBody: TodoCreateBody) =>
      todoApi.createTodo(todoCreateBody),
    onSuccess: async (
      response: ResponseGroupTodoCreate | ResponseTodoCreate
    ) => {
      try {
        if (shouldCharge && response.data.id) {
          await todoApi.assignTodo(response.data.id);
        }
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes('todos'),
        });
        showToast({
          message: '할 일 생성 성공!',
          type: 'alert',
        });
      } catch (error) {
        showToast({ message: '추가 요청 실패', type: 'confirm' });
      }
    },
  });
};
