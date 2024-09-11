import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@jeiltodo/ui/shared';
import { noteApi } from '../api/noteApi';
import { noteQueryKeys } from './queryKeys';

export const useNoteDetail = (noteId: number) => {
  return useQuery({
    queryKey: noteQueryKeys.detail(noteId),
    queryFn: () => noteApi.getNoteDetail(noteId),
  });
};

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: (noteId: number) => noteApi.deleteNote(noteId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('noteDetail'),
      });
      void queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('todo'),
      });
      void queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('noteDetail'),
      });
      showToast({ message: '노트 삭제 성공!', type: 'alert', isGroup: false });
    },
    onError: () => {
      showToast({ message: '노트 삭제 실패!', type: 'confirm' });
    },
  });
};
