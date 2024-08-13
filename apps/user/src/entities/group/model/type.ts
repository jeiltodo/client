export type Member = {
  name: string;
  color: string;
  contributionPercent: number;
};

export interface GroupResponse {
  msg: string;
  code: number;
  data: GroupsProps[];
}

/*
================================================
*/

interface GroupsProps {
  id: number;
  title: string;
}
