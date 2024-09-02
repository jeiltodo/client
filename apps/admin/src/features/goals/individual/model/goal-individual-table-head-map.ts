import type { IndividualGoal } from '../../../../entities/goals/individual';
import type { TableHeadMap } from '../../../../shared/ui/table/type';

export const GOAL_INDIVIDUAL_TABLE_HEAD_MAP: TableHeadMap<IndividualGoal>[] = [
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
    criteria: 'member.nickname',
    title: '작성자',
    withSort: true,
  },
  {
    criteria: 'createdAt',
    title: '작성 일자',
    withSort: true,
  },
  {
    criteria: 'updatedAt',
    title: '수정 일자',
    withSort: true,
  },
];
