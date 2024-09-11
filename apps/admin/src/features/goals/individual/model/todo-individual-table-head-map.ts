import type { IndividualGoalTodos } from '../../../../entities/goals/individual/model';
import type { TableHeadMap } from '../../../../shared/ui/table/type';

export const TODO_INDIVIDUAL_TABLE_HEAD_MAP: TableHeadMap<IndividualGoalTodos>[] =
  [
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
      criteria: 'updatedAt',
      title: '수정 일자',
      withSort: true,
    },
    {
      criteria: 'noteId',
      title: '노트',
      withSort: false,
    },
  ];
