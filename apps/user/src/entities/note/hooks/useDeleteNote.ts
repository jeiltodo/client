import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../api/noteApi';

export const useDeleteNote = (noteId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('notes'),
      });
    },
  });
};
