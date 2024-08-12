export type BoardMode = 'default' | 'change-leader' | 'manage-members';

export type Goal = {
  id: number;
  title: string;
};

export type Todo = {
  id: number;
  is_done: boolean;
  title: string;
  note_id?: number;
  updatedAt: string;
  createdAt: string;
  goal: Goal;
};

export type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  link_url: string | null;
  todo: Todo;
};

export type NoteResponse = {
  current_page: number;
  notes: Note[] | [];
  total_count: number;
};
