import { Todo } from '../../todo';

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  linkUrl?: string;
  todo: Todo;
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
