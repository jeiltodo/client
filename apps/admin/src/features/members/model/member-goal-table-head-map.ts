import { MemberGoal } from '../../../entities/member';
import type { TableHeadMap } from '../../../shared/ui/table/type';

export const MEMBER_GOAL_TABLE_HEAD_MAP: TableHeadMap<MemberGoal>[] = [
  {
    criteria: 'id',
    title: 'id',
    withSort: false,
  },
  {
    criteria: 'title',
    title: '목표',
    withSort: true,
  },
  {
    criteria: 'progressRate',
    title: '진행률',
    withSort: true,
  },
];
