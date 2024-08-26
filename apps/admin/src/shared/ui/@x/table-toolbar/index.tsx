'use client';
import { Dropdown } from '@jeiltodo/ui/shared';
import { DeleteButton } from '../../table-tools/delete-button';
import { SearchSummary } from '../../table-tools/search-summary';
import { useTableContext } from '../../../hooks/table/useTableContext';

interface TableToolBarProps {
  isDelete?: boolean;
  isSearch?: boolean;
  onClickDelete: () => void;
  searchedCount?: number;
  totalCount?: number;
}

export function TableToolBar({
  isDelete = true,
  isSearch = false,
  onClickDelete,
  searchedCount,
  totalCount,
}: TableToolBarProps) {
  const { setTableFilters } = useTableContext();

  const handleSelectDropdown = (value: number | string) => {
    setTableFilters((prev) => ({ ...prev, limit: value }));
  };
  return (
    <div className='w-full justify-between items-center flex pl-2 py-3'>
      <div className='flex gap-4 items-center'>
        {isDelete && <DeleteButton onDelete={onClickDelete} />}
        <SearchSummary
          totalCount={totalCount || 0}
          searchedCount={isSearch && searchedCount ? searchedCount : 0}
        />
      </div>
      <Dropdown
        hasInitialValue={true}
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
