import { PropsWithChildren, createContext, useState } from 'react';

export type TableData = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  groupCount: number;
};

const date1 = new Date(2024, 0, 1, 0, 0, 0, 0); // 2024년 1월 1일 00:00:00
const date2 = new Date(2024, 0, 2, 0, 0, 0, 0); // 2024년 1월 2일 00:00:00
const date3 = new Date(2024, 0, 3, 0, 0, 0, 0); // 2024년 1월 3일 00:00:00

const tableMock: TableData[] = [
  {
    id: 1,
    name: '가길동',
    email: 'aohn@example.com',
    createdAt: new Date(2024, 0, 1, 0, 0, 0, 0).toISOString(),
    updatedAt: new Date(2024, 0, 1, 0, 0, 0, 0).toISOString(),
    groupCount: 2,
  },
  {
    id: 2,
    name: '나길동',
    email: 'bohn@example.com',
    createdAt: new Date(2024, 0, 2, 0, 0, 0, 0).toISOString(),
    updatedAt: new Date(2024, 0, 2, 0, 0, 0, 0).toISOString(),
    groupCount: 1,
  },
  {
    id: 3,
    name: '다길동',
    email: 'cohn@example.com',
    createdAt: new Date(2024, 0, 3, 0, 0, 0, 0).toISOString(),
    updatedAt: new Date(2024, 0, 3, 0, 0, 0, 0).toISOString(),
    groupCount: 1,
  },
];

interface TableContextProps {
  tableData: any[];
  setTableData: React.Dispatch<React.SetStateAction<any[]>>;
}

export const TableContext = createContext<TableContextProps | null>(null);
const TableProvider = ({ children }: PropsWithChildren) => {
  const [tableData, setTableData] = useState(tableMock);

  return (
    <TableContext.Provider value={{ tableData, setTableData }}>
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
