export interface GroupResponse {
  msg: string;
  code: number;
  data: GroupsProps[];
}

export interface GroupPostResponse {
  msg: string;
  code: number;
  data: GroupsPostProps;
}

/*
================================================
*/

interface GroupsProps {
  id: number;
  title: string;
}

interface GroupsPostProps {
  id: number;
  title: string;
  secretCode: string;
  createAt: string;
  updatedAt: string;
}
