'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { ButtonGroup } from '@jeiltodo/ui';
import { FilterClear } from '../../features/ui/filter-clear';
import { FilterSearch } from '../../features/ui/filter-search';
import { FilterForm } from '../../features/ui/filter-form';

interface FormType {
  label: string;
  name: string;
  type?: 'email' | 'date'; // 선택
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const AdminFilter= () => {
  const [name, setName] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const goalGroupForm: FormType[] = [
    { label: '이름', name: 'name', value: name, setValue: setName},
    { label: '키워드', name: 'keyword', value: keyword, setValue: setKeyword },
    { label: '기간', name: 'period', type: 'date', value: period, setValue: setPeriod }
  ];
  const queryData = {
    name: '가나',
    data: 3,
  };
  return (
    <div>
      <div>
        <FilterForm formType={goalGroupForm} />
      </div>
      <div>
        <ButtonGroup gap={2}>
          <FilterClear setStates={[setName]} />
          <FilterSearch<typeof queryData> queryData={queryData} />
        </ButtonGroup>
      </div>
    </div>
  );
};
// const queryData = { name: '가나', data: 3 };

// <FilterButton<typeof queryData> queryData={queryData} />;
