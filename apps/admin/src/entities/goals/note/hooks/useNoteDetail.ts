import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { noteQueryKeys } from './queryKeys';
import { noteApi } from '../api/noteApi';
import { useToast } from '@jeiltodo/ui/shared';

export const useNoteDetail = (noteId: number) => {
  return useQuery({
    queryKey: noteQueryKeys.detail(noteId),
    queryFn: () => noteApi.getNoteDetail(noteId),
    enabled: noteId !== null,
  });
};

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();

  return useMutation({
    mutationFn: (noteId: number) => noteApi.deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('noteDetail'),
      });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('todo'),
      });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('noteDetail'),
      });
      showToast({ message: '노트 삭제 성공!', type: 'alert', isGroup: false });
    },
    onError: (error: any) => {
      showToast({ message: '노트 삭제 실패!', type: 'confirm' });
    },
  });
};