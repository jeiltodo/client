import { Button } from '@jeiltodo/ui/shared';
import { useTableContext } from '../../../hooks/table/useTableContext';

export function FilterClear() {
  const { tableFilters, setTableFilters } = useTableContext();
  return (
    <Button
      className='w-[84px] h-[36px]'
      onClick={() => {
        setTableFilters({ page: 1, limit: tableFilters.limit });
      }}
      variant='outline'
    >
      초기화
    </Button>
  );
}
