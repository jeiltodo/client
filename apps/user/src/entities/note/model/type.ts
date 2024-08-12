import { Todo } from '../../todo';

export type Note = {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  link_url?: string;
  todo: Todo;
};

export type NoteResponse = {
  current_page: number;
  notes: Note[];
  total_count: number;
};
