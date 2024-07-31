import { Dropdown } from '@jeiltodo/ui';
import { DeleteButton } from '../delete-button';
import { SearchSummary } from '../search-summary';

export function TableToolBar() {
  const handleSelect = () => {};
  const handleDelete = () => {};
  return (
    <div className='w-full justify-between items-center flex pl-2 py-3'>
      <div className='flex gap-4 items-center'>
        <DeleteButton onDelete={handleDelete} />
        <SearchSummary totalCount={12} searchedCount={0} />
      </div>
      <Dropdown
        hasInitialValue={true}
        onSelect={handleSelect}
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
