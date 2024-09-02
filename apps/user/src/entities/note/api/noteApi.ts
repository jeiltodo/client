import { client, type Note } from '@jeiltodo/ui/shared';
import type { ResponseWith } from '../../../shared';
import type { NoteGetResponse } from '../model/type';

// GET 요청 : 목표에 따른 노트 리스트 조회
export const getGoalNotes = async (
  goalId: number,
  params: { page: number; limit: number }
) => {
  try {
    const response = await client.get<
      ResponseWith<{ totalCount: number; currentPage: number; notes: Note[] }>
    >(`/note/list/goal/${goalId}`, {
      params,
    });
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

export const createNote = async (
  todoId: number,
  { title, content, linkUrl }: Omit<NotePostParam, 'todoId'>
) => {
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

export const patchNote = async (
  noteId: number,
  { title, content, linkUrl }: Omit<NotePatchParam, 'noteId'>
) => {
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

export const deleteNote = async (noteId: number) => {
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
  goalId: number;
  limit: number;
}

export interface NotePostParam {
  todoId: number;
  title: string;
  content: string;
  linkUrl?: string;
}
export interface NotePatchParam {
  noteId: number;
  title: string;
  content: string;
  linkUrl?: string;
}
