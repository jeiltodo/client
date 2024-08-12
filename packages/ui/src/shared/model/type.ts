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
  updatedAt: '2024-07-23T05:00:43.689Z';
  createdAt: '2024-07-23T05:00:43.689Z';
  goal: Goal;
};

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
