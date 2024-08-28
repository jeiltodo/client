import type { ReactNode } from 'react';

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  className?: string;
}

export const TableHead: React.FC<TableHeadProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <th
      className={`p-3 text-black font-pretendard-regular text-base text-center ${className}`}
      {...props}
    >
      {children}
    </th>
  );
};
