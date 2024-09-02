import type { GroupGoalTodos } from '../../../../entities/goals/group';
import type { TableHeadMap } from '../../../../shared/ui/table/type';

export const TODO_GROUP_TABLE_HEAD_MAP: TableHeadMap<GroupGoalTodos>[] = [
  {
    criteria: 'id',
    title: 'id',
    withSort: false,
  },
  {
    criteria: 'title',
    title: '할 일',
    withSort: true,
  },
  {
    criteria: 'isDone',
    title: '상태',
    withSort: true,
  },
  {
    criteria: 'writer.nickname',
    title: '작성자',
    withSort: true,
  },
  {
    criteria: 'memberInCharge.nickname',
    title: '담당자',
    withSort: true,
  },
  {
    criteria: 'updatedAt',
    title: '수정 일자',
    withSort: true,
  },
  {
    criteria: 'noteId',
    title: '노트',
    withSort: false,
  }
];
