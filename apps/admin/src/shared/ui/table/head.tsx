import type { ReactNode } from 'react';

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export const TableHead: React.FC<TableHeadProps> = ({ children, ...props }) => {
  return (
    <th className='p-3 text-center text-black font-medium text-lg' {...props}>
      {children}
    </th>
  );
};
