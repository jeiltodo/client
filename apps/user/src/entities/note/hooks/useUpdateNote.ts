import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NotePatchParam, patchNote } from '../api/noteApi';
import { useToast } from '@jeiltodo/ui/shared';

export const useUpdateNote = (noteId: number) => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: (note: Omit<NotePatchParam, 'noteId'>) =>
      patchNote(noteId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('notes'),
      });
      showToast({ message: '노트 수정 성공!', type: 'alert' });
    },
  });
};
