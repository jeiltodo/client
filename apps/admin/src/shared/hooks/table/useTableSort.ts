'use client';

import type { SortOptions } from '../../lib/sortBy';
import { sortBy } from '../../lib/sortBy';
import { useTableContext } from './useTableContext';

interface Props<T> {
  tableData: T[];
  options: SortOptions<T>;
}

export function useTableSort<T>({
  tableData,
  options: { criteria, isAscending },
}: Props<T>) {
  const sorted = sortBy([...tableData], {
    criteria,
    isAscending,
  });
  return sorted;
}
