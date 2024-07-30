import { Button } from "@jeiltodo/ui";

interface FilterSearchProps<T> {
  queryData: T;
}

export const FilterSearch = <T,>({ queryData }: FilterSearchProps<T>) => {
  return (
    <Button variant="primary">
      검색
    </Button>
  )
};
