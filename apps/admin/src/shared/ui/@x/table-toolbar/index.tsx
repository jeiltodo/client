import { Dropdown } from '@jeiltodo/ui/shared';
import { DeleteButton } from '../../table-tools/delete-button';
import { SearchSummary } from '../../table-tools/search-summary';

interface TableToolBarProps {
  isDelete?: boolean;
  isSearch?: boolean;
  onSelectDropdown: React.Dispatch<
    React.SetStateAction<string | number | undefined>
  >;
  onClickDelete: () => void;
  searchedCount?: number;
  totalCount?: number;
}

export function TableToolBar({
  isDelete = true,
  isSearch = true,
  onClickDelete,
  onSelectDropdown,
  searchedCount,
  totalCount,
}: TableToolBarProps) {
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
        onSelect={onSelectDropdown}
        round='rect'
        size='sm'
      >
        <Dropdown.Toggle />
        <Dropdown.Menu>
          <Dropdown.Item value='10'>10개씩 보기</Dropdown.Item>
          <Dropdown.Item value='10'>20개씩 보기</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
