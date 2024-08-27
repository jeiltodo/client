'use client';
import { Dropdown } from '@jeiltodo/ui/shared';
import { DeleteButton } from '../../table-tools/delete-button';
import { SearchSummary } from '../../table-tools/search-summary';
import { useTableContext } from '../../../hooks/table/useTableContext';
import { useTableCheck } from '../../../hooks/table/useTableCheck';
import { useDeleteMembers } from '../../../../entities/member/hooks/useDeleteMembers';

interface TableToolBarProps {
  searchedCount?: number;
  totalCount: number;
}

export function TableToolBar({ searchedCount, totalCount }: TableToolBarProps) {
  const { setTableFilters } = useTableContext();
  const { checkList } = useTableCheck();
  const { mutate: deleteMembers } = useDeleteMembers();

  const handleDelete = () => {
    const memberIds = checkList.reduce<number[]>((acc, cur) => {
      return cur.isChecked ? [...acc, cur.id] : acc;
    }, []);
    deleteMembers(memberIds);
  };

  const handleSelectDropdown = (value: number | string) => {
    setTableFilters((prev) => ({ ...prev, limit: value }));
  };
  return (
    <div className='w-full justify-between items-center flex pl-4 py-3'>
      <div className='flex gap-4 items-center'>
        <DeleteButton onDelete={handleDelete} />
        <SearchSummary totalCount={totalCount} searchedCount={searchedCount} />
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
