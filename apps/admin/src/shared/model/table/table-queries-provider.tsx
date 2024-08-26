'use client';
import type { PropsWithChildren } from 'react';
import { createContext, useEffect, useState } from 'react';
import { TableQueries } from './type';
import { TABLE_DEFAULT_LIMIT, TABLE_DEFAULT_PAGE } from '../../constants/table';

export interface TableContextProps {
  tableFilters: TableQueries;
  setTableFilters: React.Dispatch<React.SetStateAction<TableQueries>>;
}

export const TableContext = createContext<TableContextProps | null>(null);

export function TableQueriesProvider({ children }: PropsWithChildren) {
  const [tableFilters, setTableFilters] = useState<TableQueries>({
    page: TABLE_DEFAULT_PAGE,
    limit: TABLE_DEFAULT_LIMIT,
  });

  useEffect(() => {
    console.log(tableFilters, '🐶');
  }, [tableFilters]);
  return (
    <TableContext.Provider
      value={{
        tableFilters,
        setTableFilters,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
