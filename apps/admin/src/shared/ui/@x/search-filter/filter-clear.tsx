import { Button } from '@jeiltodo/ui/shared';
import { useTableContext } from '../../..';

export const FilterClear = () => {
  const { setTableFilters } = useTableContext();
  return (
    <Button
      variant='outline'
      className='w-[84px] h-[36px]'
      onClick={() => setTableFilters({})}
    >
      초기화
    </Button>
  );
};
