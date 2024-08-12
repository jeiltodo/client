import { Todo } from '../../todo';

export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  link_url?: string;
  todo: Todo;
}

export interface NoteResponse {
  current_page: number;
  notes: Note[] | [];
  total_count: number;
}
