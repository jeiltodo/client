'use client';
import type { PropsWithChildren } from 'react';
import { createContext, useEffect, useState } from 'react';
import { TABLE_DEFAULT_LIMIT, TABLE_DEFAULT_PAGE } from '../../constants/table';
import type { TableQueries } from './type';

export interface TableContextProps {
  tableFilters: TableQueries;
  setTableFilters: React.Dispatch<React.SetStateAction<TableQueries>>;
  tableSort: {
    criteria?: string;
    isAscending: boolean;
  };
  setTableSort: React.Dispatch<
    React.SetStateAction<{
      criteria?: string;
      isAscending: boolean;
    }>
  >;
}

export const TableContext = createContext<TableContextProps | null>(null);

export function TableProvider({ children }: PropsWithChildren) {
  const [tableFilters, setTableFilters] = useState<TableQueries>({
    page: TABLE_DEFAULT_PAGE,
    limit: TABLE_DEFAULT_LIMIT,
  });

  const [tableSort, setTableSort] = useState<{
    criteria?: string;
    isAscending: boolean;
  }>({ isAscending: true });

  return (
    <TableContext.Provider
      value={{
        tableFilters,
        setTableFilters,
        tableSort,
        setTableSort,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
