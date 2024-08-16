export interface GroupProps {
  id: number;
  title: string;
}

export interface GoalProps {
  id: number;
  title: string;
  groupId: number;
  createdAt: string;
  updatedAt: string;
}