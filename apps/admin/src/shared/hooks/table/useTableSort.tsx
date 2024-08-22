import { useTableContext } from './useTableContext';
import type { SortOptions } from '../../lib/sortBy';
import { sortBy } from '../../lib/sortBy';

export function useTableSort<T>() {
  const { tableRows, setTableRows } =
    useTableContext<ObjectWithOptionalFields<T>>();

  const handleSort = ({ criteria, isAscending }: SortOptions<T>) => {
    const sorted = sortBy([...tableRows], {
      criteria,
      isAscending,
    });
    setTableRows(sorted);
  };

  return handleSort;
}
