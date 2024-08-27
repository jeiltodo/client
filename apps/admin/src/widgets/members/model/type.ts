export interface UserInterface {
  id: number;
  email: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupsInterface {
  id: number;
  title: string;
  registerAt: string;
}

export interface GoalsInterface {
  id: number;
  title: string;
  registerAt: string;
}

export interface GroupBoardProps {
  user: UserInterface;
  groups: GroupsInterface[];
  goals: GoalsInterface[];
}
