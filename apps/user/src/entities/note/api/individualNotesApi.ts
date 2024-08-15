import { client } from '../../../shared';
import type { NoteResponse } from '../model/type';

export interface GetGoalNotesParam {
  goalId: number;
  page: number;
  limit: number;
}

// GET 요청 : 목표에 따른 노트 리스트 조회
export const getGoalNotes = async ({
  goalId,
  page = 1,
  limit = 0,
}: GetGoalNotesParam) => {
  const queryParams = [
    page ? `page=${page}` : '',
    limit ? `limit=${limit}` : '',
  ]
    .filter(Boolean)
    .join('&');

  const url = `/note/list/goal/${goalId}${queryParams ? `?${queryParams}` : ''}`;

  try {
    const response = await client.get<NoteResponse>(url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw error;
  }
};
