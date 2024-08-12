import type { Note } from '@jeiltodo/ui/shared';
import { client } from '../../../shared';
import type { Response } from '../../session';

export const getNoteDetail = async (noteId: number) => {
  const url = `/note/get/${noteId}`;

  const response = await client.get<Response<Note>>(url);
  return response.data;
};
