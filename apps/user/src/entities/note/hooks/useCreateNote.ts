import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, NotePostParam } from '../api/noteApi';

export const useCreateNote = (todoId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (note: Omit<NotePostParam, 'todoId'>) =>
      createNote(todoId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('notes'),
      });
    },
  });
};
