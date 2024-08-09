import { Goal } from '../../goal';

export type Todo = {
  id: number;
  done: boolean;
  title: string;
  noteId?: number;
  // "userId": 0,
  // "updatedAt": "2024-07-23T05:00:43.689Z",
  // "createdAt": "2024-07-23T05:00:43.689Z"
};

export type Asignee = {
  id: number;
  name: string;
  color: string;
};
