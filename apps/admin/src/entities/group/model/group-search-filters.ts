import { TableFilter } from '../../../shared/model/table/type';

export const GROUP_SEARCH_FILTERS: TableFilter[] = [
  {
    label: '그룹 이름',
    query: 'title',
    placeholder: '그룹 이름을 입력해주세요',
  },
  {
    label: '그룹장',
    query: 'nickname',
    placeholder: '그룹장을 입력해주세요',
  },
];
