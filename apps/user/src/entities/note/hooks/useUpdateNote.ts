import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NotePatchParam, patchNote } from '../api/noteApi';

export const useUpdateNote = (noteId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (note: Omit< NotePatchParam, 'noteId'>) => patchNote(noteId,note),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('notes'),
      });
    },
  });
};
