'use client';
import type { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';

export interface TableCheckListContextProps {
  checkList: {
    id: number;
    isChecked: boolean;
  }[];
  updateCheckList: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        isChecked: boolean;
      }[]
    >
  >;
}

export const TableCheckListContext =
  createContext<TableCheckListContextProps | null>(null);

interface WithId {
  id: number;
}

interface TableCheckListProps<T extends WithId> extends PropsWithChildren {
  tableData: T[];
}
export function TableCheckListProvider<T extends WithId>({
  children,
  tableData,
}: TableCheckListProps<T>) {
  const tableCheckList = tableData.map((table) => ({
    id: table.id,
    isChecked: false,
  }));
  const [checkList, setCheckList] = useState<
    {
      id: number;
      isChecked: boolean;
    }[]
  >(tableCheckList);

  return (
    <TableCheckListContext.Provider
      value={{
        checkList,
        updateCheckList: setCheckList,
      }}
    >
      {children}
    </TableCheckListContext.Provider>
  );
}
