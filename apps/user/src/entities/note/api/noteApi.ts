import { client } from '../../../shared';
import type { NoteGetResponse, NoteResponse } from '../model/type';

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

// GET 요청 : 노트 상세 정보 조회
export const getNoteDetail = async (noteId: number) => {
  const url = `/note/get/${noteId}`;

  const response = await client.get<NoteGetResponse>(url);
  return response.data;
};

//CREATE 요청 : 노트 생성
export const createNote = async ({
  todoId,
  title,
  content,
  linkUrl,
}: NotePostParam) => {
  try {
    const response = await client.post('note/create', {
      todoId,
      title,
      content,
      linkUrl,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create note:', error);
    throw error;
  }
};

//PATCH 요청 : 노트 수정
export const patchNote = async ({
  noteId,
  title,
  content,
  linkUrl,
}: NotePatchParam) => {
  try {
    const response = await client.patch(`note/update/${noteId}`, {
      title,
      content,
      linkUrl,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to patch note:', error);
    throw error;
  }
};

// DELETE 요청 : 노트 삭제
export const deleteNote = async ({ noteId }: DeleteNoteParam) => {
  try {
    const response = await client.delete(`/note/delete/${noteId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete note:', error);
    throw error;
  }
};

/*
================================================
*/

export interface GetGoalNotesParam {
  goalId: string | string[];
  page: number;
  limit: number;
}

export interface NotePostParam {
  todoId: string;
  title: string;
  content: string;
  linkUrl?: string;
}
export interface NotePatchParam {
  noteId: string;
  title: string;
  content: string;
  linkUrl?: string;
}

interface DeleteNoteParam {
  noteId: number;
}
