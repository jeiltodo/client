export type Group = {
  id: number;
  title: string;
  createdAt: string;
  updatedAT: string;
  secretCode: string;
  createUser: string;
};

export type Member = {
  id: number;
  isLeader: boolean;
  nickname: string;
  color: string;
  contributionRank: number;
};

export type GroupWithMembers = Group & {
  members: Member[];
};

export type GroupCode = Pick<Group, 'secretCode'>;

export type GroupTitleOrCode = { secretCode?: string; title?: string };