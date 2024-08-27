import { useContext } from 'react';
import { TableContext } from '../../model/table/table-provider';

export function useTableContext() {
  const context = useContext(TableContext);
  if (context === null) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
}
