'use client';

import { ButtonGroup } from '@jeiltodo/ui/shared';
import { TableFilter } from '../../../model/table/type';
import { FilterForm } from './filter-form';
import { FilterClear } from './filter-clear';
import { FilterSearch } from './filter-search';
import { useState } from 'react';

interface SearchFilterProps {
  filters: TableFilter[];
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ filters }) => {
  const initialFilters = filters.reduce(
    (acc, cur) => ({ ...acc, [cur.query]: '' }),
    {}
  );
  const [formFilters, setFormFilters] = useState(
    initialFilters as Record<string, string>
  );

  return (
    <div className='flex flex-col gap-3 py-[16px] px-[20px] bg-white rounded-xl w-[930px]'>
      <div>
        <FilterForm
          filters={filters}
          filtersState={formFilters}
          updatefiltersState={setFormFilters}
        />
      </div>
      <div className='flex items-center justify-end border-t-[1px] border-slate-200 pt-3'>
        <ButtonGroup gap={2}>
          <FilterClear />
          <FilterSearch filtersState={formFilters} />
        </ButtonGroup>
      </div>
    </div>
  );
};
