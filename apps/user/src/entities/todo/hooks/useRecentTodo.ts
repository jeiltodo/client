import { useInfiniteQuery } from '@tanstack/react-query';
import { calculateTotalPages } from '@jeiltodo/ui/shared';
import { todoApi } from '../api/todoApi';
import { todoQueryKeys } from './queryKey';

interface PageLimit {
  limit: number;
  goalIds: string;
  isDone: boolean | null | undefined;
}

interface GoalWithTodosResponse {
  totalCount: number;
  currentPage: number;
}

export const useRecentTodo = ({ limit, goalIds, isDone }: PageLimit) => {
  return useInfiniteQuery({
    queryKey: todoQueryKeys.individual.all({ limit, goalIds, isDone }),
    queryFn: ({ pageParam }) =>
      todoApi.getRecentTodo({
        page: pageParam || 1,
        limit,
        goalIds,
        isDone,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { totalCount, currentPage } =
        lastPage.data as GoalWithTodosResponse;
      const totalPages = calculateTotalPages(totalCount, limit);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: isDone !== undefined,
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          todos: page.data.todos.map((todo) => ({
            id: todo.id,
            isDone: todo.isDone ?? false, // null 또는 undefined일 경우 false로 설정
            title: todo.title,
            noteId: todo.noteId,
            goal: {
              id: todo.goal.id,
              title: todo.goal.title,
              memberId: 0,
              createdAt: '',
              updatedAt: '',
              progress: 0,
            },
          })),
        },
      })),
    }),
  });
};
