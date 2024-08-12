import { client } from '../../../shared';

interface DeleteNoteParam {
  noteId: number;
}

export const deleteNote = async ({ noteId }: DeleteNoteParam) => {
  try {
    const response = await client.delete(`/note/delete/${noteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
