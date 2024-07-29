import { Button } from '@jeiltodo/ui';
import React, { ReactNode, useContext } from 'react';
import SortButton from '../../shared/ui/sort-button';
import { TableContext, TableData } from './table-provider';
import { sortBy, SortOptions } from '../../shared/lib/sortBy';
import { formatDateString } from '@jeiltodo/lib';
import Checkbox from '../../../../../packages/ui/src/shared/checkbox';

// Table 컴포넌트
interface TableProps {
  children: ReactNode;
}

const Table: React.FC<TableProps> & {
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Row: typeof TableRow;
  Cell: typeof TableCell;
  Head: typeof TableHead;
  HeadWithSort: typeof TableHeadWithSort;
} = ({ children }) => {
  return <table className='w-full border-collapse'>{children}</table>;
};

// TableHeader 컴포넌트
const TableHeader: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <thead className='border-t border-b border-slate-400'>{children}</thead>
  );
};

// TableBody 컴포넌트
const TableBody: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

// TableRow 컴포넌트
const TableRow: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <tr className={`border-b border-slate-100 ${className}`}>{children}</tr>
  );
};

// TableCell 컴포넌트
const TableCell: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <td className='p-2 text-center text-lg font-medium'>{children}</td>;
};

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ children, ...props }) => {
  return (
    <th className='p-3 text-center text-black font-medium text-lg' {...props}>
      {children}
    </th>
  );
};

interface HeadWithSortProps extends TableHeadProps {
  onSort: (isAscending: boolean) => void;
}

const TableHeadWithSort: React.FC<HeadWithSortProps> = ({
  children,
  onSort,
  className,
}) => {
  return (
    <Table.Head className={`p-3 text-center ${className}`}>
      <div className='flex items-center justify-center gap-2'>
        {children}
        <SortButton onSort={onSort} />
      </div>
    </Table.Head>
  );
};

// Compound 컴포넌트 구조 설정
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.HeadWithSort = TableHeadWithSort;

export { Table, TableHeader, TableBody, TableRow, TableCell, TableHead };

const AdminUsersTable: React.FC = () => {
  const table = useContext(TableContext);
  if (!table) {
    throw Error('context 내부에서 사용해주세요');
  }
  const { tableData, setTableData } = table;

  const handleSort = ({
    criteria,
    isAscending,
  }: SortOptions<Omit<TableData, 'id'>>) => {
    const sorted = sortBy([...tableData], {
      criteria,
      isAscending,
    });
    setTableData(sorted);
  };
  return (
    <Table>
      <Table.Header>
        <Table.Row className='border-slate-400'>
          <Table.Head>
            <Checkbox isChecked={true} onChange={() => {}} />
          </Table.Head>
          <Table.Head>id</Table.Head>
          <TableHeadWithSort
            onSort={(isAscending) => {
              handleSort({ isAscending, criteria: 'name' });
            }}
          >
            이름
          </TableHeadWithSort>
          <TableHeadWithSort
            onSort={(isAscending) => {
              handleSort({ isAscending, criteria: 'email' });
            }}
          >
            이메일
          </TableHeadWithSort>
          <TableHeadWithSort
            onSort={(isAscending) => {
              handleSort({ isAscending, criteria: 'createdAt' });
            }}
          >
            가입일자
          </TableHeadWithSort>
          <TableHeadWithSort
            onSort={(isAscending) => {
              handleSort({ isAscending, criteria: 'updatedAt' });
            }}
          >
            수정일자
          </TableHeadWithSort>
          <TableHeadWithSort
            onSort={(isAscending) => {
              handleSort({ isAscending, criteria: 'groupCount' });
            }}
          >
            그룹 수
          </TableHeadWithSort>
          <Table.Head>관리설정</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.map((table) => (
          <Table.Row>
            <Table.Cell>
              <Checkbox isChecked={true} onChange={() => {}} />
            </Table.Cell>
            <Table.Cell>{table.id}</Table.Cell>
            <Table.Cell>{table.name}</Table.Cell>
            <Table.Cell>{table.email}</Table.Cell>
            <Table.Cell>{formatDateString(table.createdAt)}</Table.Cell>
            <Table.Cell>{formatDateString(table.updatedAt)}</Table.Cell>
            <Table.Cell>{table.groupCount}개</Table.Cell>
            <Table.Cell>
              <Button variant='outline' className='text-sm w-[84px]'>
                관리
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default AdminUsersTable;
