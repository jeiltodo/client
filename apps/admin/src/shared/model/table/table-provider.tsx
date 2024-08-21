'use client';
import type { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';
import { TableQuery } from './type';

export interface TableContextProps<T> {
  tableRows: T[];
  tableFilters: Partial<Record<TableQuery, string>>;
  setTableRows: React.Dispatch<React.SetStateAction<T[]>>;
  setTableFilters: React.Dispatch<
    React.SetStateAction<Partial<Record<TableQuery, string>> | undefined>
  >;
}

export const TableContext = createContext<TableContextProps<any> | null>(null);

interface TableProviderProps<T> extends PropsWithChildren {
  initialData?: T[];
}

export function TableProvider<T>({
  children,
  initialData,
}: TableProviderProps<T>) {
  const [tableRows, setTableRows] = useState<T[]>(initialData || []);
  const [tableFilters, setTableFilters] =
    useState<Partial<Record<TableQuery, string>>>();
  const contextValue = {
    tableRows,
    setTableRows,
    tableFilters,
    setTableFilters,
  } as TableContextProps<T>;

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
}
