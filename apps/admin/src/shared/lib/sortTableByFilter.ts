import { useTableContext } from '../hooks/table/useTableContext';
import type { SortOptions} from './sortBy';
import { sortBy } from './sortBy';

export function sortTableByFilter<T>() {
  const { tableData, setTableData } =
    useTableContext<ObjectWithOptionalFields<T>>();

  const handleSort = ({ criteria, isAscending }: SortOptions<T>) => {
    const sorted = sortBy([...tableData], {
      criteria,
      isAscending,
    });
    setTableData(sorted);
  };

  return handleSort;
}
