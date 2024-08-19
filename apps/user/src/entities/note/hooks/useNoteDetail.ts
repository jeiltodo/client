import { useQuery } from '@tanstack/react-query';
import { noteQueryKeys } from '../queryKeys';
import { getNoteDetail } from '../api/noteApi';

export const useNoteDetail = (noteId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: noteQueryKeys.note.noteDetail(noteId),
    queryFn: () => getNoteDetail(Number(noteId)),
    select: (data) => data.data,
    enabled: noteId !== 'new',
  });
  return {
    noteDetail: data,
    error,
    isLoading,
  };
};
