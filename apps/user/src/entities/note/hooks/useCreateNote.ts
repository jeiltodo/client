import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, NotePostParam } from '../api/noteApi';
import { useToast } from '@jeiltodo/ui/shared';

export const useCreateNote = (todoId: number) => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: (note: Omit<NotePostParam, 'todoId'>) =>
      createNote(todoId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('notes'),
      });
      showToast({ message: '노트 작성 성공!', type: 'alert' });
    },
  });
};
