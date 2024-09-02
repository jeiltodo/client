import type { ReactNode } from 'react';

export const TableRow: React.FC<{
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className, onClick }) => {
  return (
    <tr className={`border-b border-slate-100 ${className}`} onClick={onClick}>
      {children}
    </tr>
  );
};
