import { useQuery } from '@tanstack/react-query';
import { noteQueryKeys } from '../queryKeys';
import { getGoalNotes, GetGoalNotesParam } from '../api/individualNotesApi';

export const useGoalNotes = ({ goalId, page, limit }: GetGoalNotesParam) => {
  return useQuery({
    queryKey: noteQueryKeys.note.allOfGoal(goalId, page, limit),
    queryFn: () => getGoalNotes({ goalId, page, limit }),
  });
};
