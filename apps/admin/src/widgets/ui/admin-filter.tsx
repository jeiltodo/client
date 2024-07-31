'use client';

import { ButtonGroup } from '@jeiltodo/ui';
import { Filter } from '../../app/page';
import { FilterForm } from '../../shared/ui/table-filter/filter-form';
import { FilterClear } from '../../shared/ui/table-filter/filter-clear';
import { FilterSearch } from '../../shared/ui/table-filter/filter-search';

interface AdminFilterProps {
  filters: Filter[];
}

export const AdminFilter: React.FC<AdminFilterProps> = ({ filters }) => {
  return (
    <div className='flex flex-col gap-3 w-[930px] py-[16px] px-[20px] bg-white rounded-xl'>
      <div>
        <FilterForm filters={filters} />
      </div>
      <div className='flex items-center justify-end border-t-[1px] border-slate-200 pt-3'>
        <ButtonGroup gap={2}>
          <FilterClear />
          <FilterSearch<typeof filters> queries={filters} />
        </ButtonGroup>
      </div>
    </div>
  );
};
