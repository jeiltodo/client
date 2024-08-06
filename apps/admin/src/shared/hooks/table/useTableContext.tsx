import { useContext } from 'react';
import type { TableContextProps } from '../../model/table-provider';
import { TableContext } from '../../model/table-provider';

export function useTableContext<T>() {
  const context = useContext(TableContext);
  if (context === null) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context as TableContextProps<T>;
}
