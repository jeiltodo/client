import React from 'react';
import { TableContext } from '../../model/table/table-provider';

export function useTableContext() {
  const context = React.useContext(TableContext);
  if (context === null) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
}
