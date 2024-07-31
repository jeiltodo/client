import type { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';

export interface TableContextProps<T> {
  tableData: T[];
  setTableData: React.Dispatch<React.SetStateAction<T[]>>;
}

export const TableContext = createContext<TableContextProps<any> | null>(null);

interface TableProviderProps<T> extends PropsWithChildren {
  initialData?: T[];
}

export function TableProvider<T>({
  children,
  initialData,
}: TableProviderProps<T>) {
  const [tableData, setTableData] = useState<T[]>(initialData || []);

  const contextValue = { tableData, setTableData } as TableContextProps<T>;
  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
}
