import { Dropdown } from '@jeiltodo/ui';
import { DeleteButton } from '../delete-button';
import { SearchSummary } from '../search-summary';

export function TableToolBar() {
  const handleSelect = () => {};
  //   TODO: hasinitialVlaue가 text 렌더링 필요 / rounde, size는 상속받도록  / onSelect시 item,value의 구분 / z-index 처리

  const handleDelete = () => {};
  return (
    <div className='w-full justify-between items-center flex pl-2 py-3'>
      <div className='flex gap-4 items-center'>
        <DeleteButton onDelete={handleDelete} />
        <SearchSummary totalCount={12} searchedCount={0} />
      </div>
      <Dropdown hasInitialValue={true} onSelect={handleSelect}>
        <Dropdown.Toggle round='rect' size='sm' />
        <Dropdown.Menu round='rect'>
          <Dropdown.Item value='10' round='rect' size='sm'>
            10개씩 보기
          </Dropdown.Item>
          <Dropdown.Item value='10' round='rect' size='sm'>
            20개씩 보기
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
