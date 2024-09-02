'use client';

import { Dropdown } from '@jeiltodo/ui/shared';
import { SearchSummary } from '../../table-tools/search-summary';
import { useTableContext } from '../../../hooks/table/useTableContext';

interface TableToolBarProps {
  searchedCount?: number;
  totalCount: number;
}

export function TableToolBar({ searchedCount, totalCount }: TableToolBarProps) {
  const { setTableFilters } = useTableContext();

  const handleSelectDropdown = (value: number | string) => {
    setTableFilters((prev) => ({ ...prev, limit: value }));
  };
  return (
    <div className='w-full justify-between items-center flex pl-4 py-3'>
      <div className='flex gap-4 items-center'>
        <SearchSummary searchedCount={searchedCount} totalCount={totalCount} />
      </div>
      <Dropdown
        hasInitialValue
        onSelect={handleSelectDropdown}
        round='rect'
        size='sm'
      >
        <Dropdown.Toggle />
        <Dropdown.Menu>
          <Dropdown.Item value='10'>10개씩 보기</Dropdown.Item>
          <Dropdown.Item value='20'>20개씩 보기</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
