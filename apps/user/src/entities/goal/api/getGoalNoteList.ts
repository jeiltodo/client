import { client } from '../../../shared';
import type { Response } from '../../session';
import type { Note } from '../model/type';

export interface GoalNoteListParam {
	goalid: number;
	page: number;
	limit: number;
}
export const getGoalNoteList = async ({ goalid, page, limit }: GoalNoteListParam) => {
	try {
		const response = await client.post<Response<Note>>(`/note/list/goal/${goalid}?page=${page}&limit=${limit}`);
		console.log('goal note api response: ', response);
		return response.data;
	} catch (error) {
		console.log('error: ', error);
	}
};
