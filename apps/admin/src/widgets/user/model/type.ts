export interface UserInterface {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupsInterface {
  id: number;
  name: string;
  registerAt: string;
}

export interface GoalsInterface {
  id: number;
  name: string;
  registerAt: string;
}


export interface UserGroupBoardProps {
  user: UserInterface
  groups: GroupsInterface[]
  goals: GoalsInterface[]
}