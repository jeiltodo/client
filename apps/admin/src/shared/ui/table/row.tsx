import type { ReactNode } from 'react';

export const TableRow: React.FC<{
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className, onClick }) => {
  return (
    <tr onClick={onClick} className={`border-b border-slate-100 ${className}`}>
      {children}
    </tr>
  );
};
