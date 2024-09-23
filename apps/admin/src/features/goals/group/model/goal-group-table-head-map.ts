import type { GroupGoals } from '../../../../entities/goals/group/model';
import type { TableHeadMap } from '../../../../shared/ui/table/type';

export const GOAL_GROUP_TABLE_HEAD_MAP: TableHeadMap<GroupGoals>[] = [
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
    criteria: 'group.title',
    title: '그룹이름',
    withSort: true,
  },
  {
    criteria: 'member.nickname',
    title: '작성자',
    withSort: true,
  },
  {
    criteria: 'updatedAt',
    title: '수정 일자',
    withSort: true,
  },
];
