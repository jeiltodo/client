import { useInfiniteQuery } from '@tanstack/react-query';
import { todoQueryKeys } from './queryKey';
import { todoApi } from '../api/todoApi';

interface PageLimit {
  limit: number;
  goal_ids: number[];
  is_done: boolean | null | undefined;
}

interface GoalWithTodosResponse {
  totalCount: number;
  currPage: number;
}

export const useRecentTodo = ({ limit, goal_ids, is_done }: PageLimit) => {
  return useInfiniteQuery({
    queryKey: todoQueryKeys.individual.all(),
    queryFn: ({ pageParam }) =>
      todoApi.getRecentTodo({ page: pageParam || 1, limit, goal_ids, is_done }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { totalCount, currPage } = lastPage.data as GoalWithTodosResponse;
      const totalPages = calculateTotalPages(totalCount, limit);
      return currPage < totalPages ? currPage + 1 : undefined;
    },
    enabled: is_done !== undefined,
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          todos: page.data.todos.map((todo) => ({
            id: todo.id,
            done: todo.is_done,
            title: todo.title,
            noteId: todo.note_id,
            createdAt: todo.created_at,
            updatedAt: todo.updated_at,
            goal: {
              id: todo.goal.id,
              title: todo.goal.title,
              memberId: null, // 필요한 경우 기본값 설정
              createdAt: null,
              updatedAt: null,
              progress: null,
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
