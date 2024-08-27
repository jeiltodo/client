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

interface Props<T extends WithId> extends PropsWithChildren {
  tableData: T[];
}
export function TableCheckListProvider<T extends WithId>({
  children,
  tableData,
}: Props<T>) {
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

  useEffect(() => {
    console.log(checkList);
  }, [checkList]);

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
