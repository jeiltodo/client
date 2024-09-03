'use client';
import type { PropsWithChildren } from 'react';
import { createContext, useEffect, useState } from 'react';

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
  const [checkList, setCheckList] = useState<
    {
      id: number;
      isChecked: boolean;
    }[]
  >(mapTableDataForCheckList(tableData));

  useEffect(() => {
    setCheckList(mapTableDataForCheckList(tableData));
  }, [tableData]);

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

function mapTableDataForCheckList<T extends WithId>(tableData: T[]) {
  return tableData.map((table) => ({
    id: table.id,
    isChecked: false,
  }));
}
