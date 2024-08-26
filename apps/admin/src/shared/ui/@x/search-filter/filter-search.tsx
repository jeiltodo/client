import { Button } from '@jeiltodo/ui/shared';
import { useTableContext } from '../../../hooks/table/useTableContext';

interface FilterSearchProps {
  filtersState: Record<string, string>;
}

export const FilterSearch = ({ filtersState }: FilterSearchProps) => {
  const { setTableFilters } = useTableContext();
  return (
    <Button
      variant='primary'
      className='w-[84px] h-[36px]'
      onClick={() => {
        setTableFilters((prev) => ({ ...prev, ...filtersState }));
      }}
    >
      검색
    </Button>
  );
};
