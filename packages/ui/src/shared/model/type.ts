export type BoardMode = 'default' | 'change-leader' | 'manage-members';

export interface Goal {
  id: number;
  title: string;
  progress?: number;
}

export interface Todo {
  id: number;
  isDone: boolean;
  title: string;
  noteId?: number;
  updatedAt: string;
  createdAt: string;
  goal: Goal;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  linkUrl?: string;
  todo: Todo;
}

export interface NoteResponse {
  currentPage: number;
  notes: Note[] | [];
  totalCount: number;
}

export interface ResponseWith<T> {
  msg: string;
  code: number;
  data: T;
}
