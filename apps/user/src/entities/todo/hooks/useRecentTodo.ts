import { useInfiniteQuery } from '@tanstack/react-query';
import { todoQueryKeys } from './queryKey';
import { todoApi } from '../api/todoApi';

interface PageLimit {
  limit: number;
  goalIds: string;
  isDone: boolean | null | undefined;
}

interface GoalWithTodosResponse {
  totalCount: number;
  currPage: number;
}

export const useRecentTodo = ({ limit, goalIds, isDone }: PageLimit) => {
  return useInfiniteQuery({
    queryKey: todoQueryKeys.individual.all({ limit, goalIds, isDone }),
    queryFn: ({ pageParam }) =>
      todoApi.getRecentTodo({
        page: pageParam || 1,
        limit,
        goalIds: goalIds,
        isDone: isDone,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { totalCount, currPage } = lastPage.data as GoalWithTodosResponse;
      const totalPages = calculateTotalPages(totalCount, limit);
      return currPage < totalPages ? currPage + 1 : undefined;
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
            done: todo.isDone ?? false, // null 또는 undefined일 경우 false로 설정
            title: todo.title,
            noteId: todo.noteId,
            goal: {
              id: todo.goal.id,
              title: todo.goal.title,
              memberId: 0, // 기본값 설정
              createdAt: '', // 기본값 설정
              updatedAt: '', // 기본값 설정
              progress: 0, // 기본값 설정
            },
          })),
        },
      })),
    }),
  });
};

/*
////////////////////////////////////////////////////////////////////////////////
*/
function calculateTotalPages(totalCount: number, itemsPerPage: number): number {
  const fullPages = Math.floor(totalCount / itemsPerPage);
  const hasPartialPage = totalCount % itemsPerPage !== 0;
  return fullPages + (hasPartialPage ? 1 : 0);
}
