import type { ReactNode } from 'react';

export const TableRow: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <tr className={`border-b border-slate-100 ${className}`}>{children}</tr>
  );
};
