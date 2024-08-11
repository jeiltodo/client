import { Todo } from '../../todo';

export type Goal = {
	id: number;
	title: string;
	todos: Todo[];
};

export type Note = {
	id: number;
	title: string;
	is_done: boolean;
	note_id: number;
	created_at: Date;
	updated_at: Date;
	goal: Goal;
};
