import { useQuery } from '@tanstack/react-query';
import { getNoteDetail } from '../api';
import { noteQueryKeys } from './queryKeys';

export const useNoteDetail = (noteId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: noteQueryKeys.note.noteDetail(noteId),
    queryFn: () => getNoteDetail(Number(noteId)),
    enabled: noteId !== 'new',
  });
  return {
    noteDetail: data?.data,
    error,
    isLoading,
  };
};
