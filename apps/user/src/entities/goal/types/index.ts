import type { Member } from '@jeiltodo/ui/entities';
import type { Todo } from '../../todo';

export interface IndividualGoal {
  id: number;
  title: string;
  memberId: number;
  createdAt: string;
  updatedAt: string;
}

export interface GroupGoal {
  id: number;
  title: string;
  groupId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IndividualProgress {
  progress: number;
}

export interface GoalWithProgress extends IndividualGoal, IndividualProgress {}

export type GoalWithTodos = GoalWithProgress & { todos: Todo[] };

/*
================================================
*/

export type GroupMember = Pick<Member, 'nickname' | 'color'> & {
  contributionPercent: number;
};
export type GroupTodo = Todo & { memberInCharge: string | null };

export interface GroupGoalWithProgress {
  title: string;
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  progress: {
    completedPercent: number;
    members: GroupMember[];
  };
}

export type GroupGoalWithTodos = GroupGoal & {
  todos: GroupTodo[];
  progress: {
    completedPercent: number;
    members: GroupMember[];
  };
};

export type GoalIdAndTitle = Pick<GoalWithProgress, 'id' | 'title'>;
