import { Button } from '@jeiltodo/ui/shared';

interface FilterSearchProps<T> {
  queries: T;
}

export const FilterSearch = <T,>({ queries }: FilterSearchProps<T>) => {
  console.log(queries);
  return (
    <Button variant='primary' className='w-[84px] h-[36px]'>
      검색
    </Button>
  );
};
