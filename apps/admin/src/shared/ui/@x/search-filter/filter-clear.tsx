import { Button } from '@jeiltodo/ui/shared';
import { useTableContext } from '../../../hooks/table/useTableContext';

export const FilterClear = () => {
  const { tableFilters, setTableFilters } = useTableContext();
  return (
    <Button
      variant='outline'
      className='w-[84px] h-[36px]'
      onClick={() => {
        setTableFilters({ page: 1, limit: tableFilters.limit });
      }}
    >
      초기화
    </Button>
  );
};
