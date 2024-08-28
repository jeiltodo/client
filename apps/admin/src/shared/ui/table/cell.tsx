import type { ReactNode } from 'react';

export const TableCell: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <td className={`px-2 py-4 text-lg font-medium  ${className}`}>
      {children}
    </td>
  );
};
