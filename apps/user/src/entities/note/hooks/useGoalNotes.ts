import { useInfiniteQuery } from '@tanstack/react-query';
import { noteQueryKeys } from '../queryKeys';
import type { GetGoalNotesParam } from '../api/noteApi';
import { getGoalNotes } from '../api/noteApi';
import { calculateTotalPages } from '../../../shared';

interface PageInfo {
  totalCount: number;
  currentPage: number;
}

export const useGoalNotes = ({ goalId, limit }: GetGoalNotesParam) => {
  return useInfiniteQuery({
    queryKey: noteQueryKeys.note.allOfGoal(goalId),
    queryFn: ({ pageParam }) =>
      getGoalNotes(goalId, { page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { totalCount, currentPage } = lastPage.data as PageInfo;

      const totalPages = calculateTotalPages(totalCount, limit);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
