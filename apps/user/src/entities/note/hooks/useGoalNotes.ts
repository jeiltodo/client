import { useQuery } from '@tanstack/react-query';
import { getGoalNotes, GetGoalNotesParam } from '../api/getGoalNotes';
import { noteQueryKeys } from '../queryKeys';

export const useGoalNotes = ({
  goalid,
  page = 1,
  limit,
}: GetGoalNotesParam) => {
  const { data, error, isLoading } = useQuery({
    queryKey: noteQueryKeys.note.allOfGoal(goalid, page, limit),
    queryFn: () => getGoalNotes({ goalid, page, limit }),
  });
  return {
    goalNotes: data,
    error,
    isLoading,
  };
};
