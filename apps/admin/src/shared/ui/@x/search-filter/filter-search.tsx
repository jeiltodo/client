import { Button } from '@jeiltodo/ui/shared';
import { useTableContext } from '../../../hooks/table/useTableContext';

interface FilterSearchProps {
  filtersState: Record<string, string>;
}

export function FilterSearch({ filtersState }: FilterSearchProps) {
  const { setTableFilters } = useTableContext();
  return (
    <Button
      className='w-[84px] h-[36px]'
      onClick={() => {
        setTableFilters((prev) => ({ ...prev, page: 1, ...filtersState }));
      }}
      variant='primary'
    >
      검색
    </Button>
  );
}
