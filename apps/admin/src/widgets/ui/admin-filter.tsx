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
  placeholder?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

interface QueryData {
  [key: string]: string | number;
}

interface AdminFilterProps {
  setState: Dispatch<SetStateAction<string>>[];
  formType: FormType[];
  queryData: QueryData;
}

export const AdminFilter: React.FC<AdminFilterProps> = ({
  setState,
  formType,
  queryData,
}) => {
  return (
    <div className='flex flex-col gap-3 w-[930px] py-[16px] px-[20px] bg-white rounded-xl'>
      <div>
        <FilterForm formType={formType} />
      </div>
      <div className='flex items-center justify-end border-t-[1px] border-slate-200 pt-3'>
        <ButtonGroup gap={2}>
          <FilterClear setStates={setState} />
          <FilterSearch<typeof queryData> queryData={queryData} />
        </ButtonGroup>
      </div>
    </div>
  );
};
// const queryData = { name: '가나', data: 3 };

// <FilterButton<typeof queryData> queryData={queryData} />;
