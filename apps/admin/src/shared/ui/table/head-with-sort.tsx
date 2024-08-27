'use client';
import { Sort } from '@jeiltodo/icons';
import type { TableHeadProps } from './head';
import { TableHead } from './head';
import { useTableContext } from '../../hooks/table/useTableContext';

interface HeadWithSortProps extends TableHeadProps {
  criteria: string;
}

export const TableHeadWithSort: React.FC<HeadWithSortProps> = ({
  children,
  criteria,
  className,
}) => {
  const { setTableSort } = useTableContext();

  const handleSort = () => {
    setTableSort((prev) => ({ criteria, isAscending: !prev.isAscending }));
  };
  return (
    <TableHead className={`p-3 text-center ${className}`} onClick={handleSort}>
      <div className='flex items-center justify-center gap-2'>
        {children}
        <Sort className='cursor-pointer w-6 h-6' />
      </div>
    </TableHead>
  );
};
