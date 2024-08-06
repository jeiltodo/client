import { TableFilter } from '../../../shared/model/type';

export const GROUP_SEARCH_FIILTERS: TableFilter[] = [
  {
    label: '이름',
    query: 'name',
    placeholder: '이름을 입력해주세요',
  },
  {
    label: '키워드',
    query: 'keyword',
    placeholder: '이메일을 입력해주세요',
  },
  {
    label: '기간',
    query: 'period',
    type: 'date',
  },
];
