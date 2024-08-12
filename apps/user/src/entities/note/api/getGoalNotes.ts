import { client } from '../../../shared';
import type { Response } from '../../session';
import type { NoteResponse } from '../model/type';

export interface GetGoalNotesParam {
  goalid: number;
  page: number;
  limit: number;
}

export const getGoalNotes = async ({
  goalid,
  page = 1,
  limit,
}: GetGoalNotesParam): Promise<Response<NoteResponse>> => {
  // 쿼리 파라미터 문자열 생성
  const queryParams = [
    page ? `page=${page}` : '',
    limit ? `limit=${limit}` : '',
  ]
    .filter(Boolean)
    .join('&');

  // 요청 URL 구성
  const url = `/note/list/goal/${goalid}${queryParams ? `?${queryParams}` : ''}`;

  try {
    // GET 요청으로 데이터 요청
    const response = await client.get(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};
