import { client } from '../../../shared';
import type { Response } from '../../session';
import type { NoteResponse } from '../model/type';

export const getNoteDetail = async (
  noteId: number
): Promise<Response<NoteResponse>> => {
  // 요청 URL 구성
  const url = `/note/get/${noteId}`;

  // GET 요청으로 데이터 요청
  const response = await client.get(url);
  return response.data;
};
