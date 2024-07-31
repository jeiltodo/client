import { Button } from "@jeiltodo/ui";

interface FilterSearchProps<T> {
  queryData: T;
}

export const FilterSearch = <T,>({ queryData }: FilterSearchProps<T>) => {
  console.log(queryData)
  return (
    <Button variant="primary" className='w-[84px] h-[36px]'>
      검색
    </Button>
  )
};
