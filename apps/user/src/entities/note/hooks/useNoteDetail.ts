import { useQuery } from '@tanstack/react-query';
import { getNoteDetail } from '../api/getNoteDetail';
import { noteQueryKeys } from '../queryKeys';

export const useNoteDetail = (noteId: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: noteQueryKeys.note.noteDetail(noteId),
    queryFn: () => getNoteDetail(noteId),
  });
  return {
    noteDetail: data,
    error,
    isLoading,
  };
};
