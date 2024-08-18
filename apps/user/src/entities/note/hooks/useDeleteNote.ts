import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../api/noteApi';

export const useDeleteNote = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (noteId: number) => deleteNote(noteId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey.includes('notes'),
			});
		},
	});
};
