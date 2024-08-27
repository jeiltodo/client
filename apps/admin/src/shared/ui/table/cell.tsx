import type { ReactNode } from 'react';

export const TableCell: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <td className={`p-2 text-lg font-medium  ${className}`}>{children}</td>
  );
};
