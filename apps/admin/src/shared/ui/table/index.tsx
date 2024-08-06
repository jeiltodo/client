import type { ReactNode } from 'react';
import { TableHeader } from './header';
import { TableBody } from './body';
import { TableRow } from './row';
import { TableCell } from './cell';
import { TableHeadWithSort } from './head-with-sort';
import { TableHead } from './head';
import { TableHeadWithCheck } from './head-with-check';

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
  HeadWithCheck: typeof TableHeadWithCheck;
} = ({ children }) => {
  return <table className='w-full border-collapse'>{children}</table>;
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.HeadWithSort = TableHeadWithSort;
Table.HeadWithCheck = TableHeadWithCheck;

export { Table };
