import { useQuery } from '@tanstack/react-query';
import { noteQueryKeys } from '../queryKeys';
import { getNoteDetail } from '../api/noteApi';

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
