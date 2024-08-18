import { Todo } from '../../todo';

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  linkUrl?: string;
  todo: Todo & {
    goal: {
      id: number;
      title: string;
    };
  };
}

export interface NoteResponse {
  code: number;
  data: {
    currentPage: number;
    notes: Note[] | [];
    totalCount: number;
  };
  msg: string;
}
export interface NoteGetResponse {
  code: number;
  data: Note;
  msg: string;
}
