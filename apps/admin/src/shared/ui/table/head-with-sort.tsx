import { SortButton } from '../table-tools/sort-button';
import type { TableHeadProps } from './head';
import { TableHead } from './head';

interface HeadWithSortProps extends TableHeadProps {
  onSort: (isAscending: boolean) => void;
}

export const TableHeadWithSort: React.FC<HeadWithSortProps> = ({
  children,
  onSort,
  className,
}) => {
  return (
    <TableHead className={`p-3 text-center ${className}`}>
      <div className='flex items-center justify-center gap-2'>
        {children}
        <SortButton onSort={onSort} />
      </div>
    </TableHead>
  );
};
