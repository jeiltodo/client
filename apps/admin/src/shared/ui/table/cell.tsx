import type { ReactNode } from 'react';

export const TableCell: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <td className='p-2 text-center text-lg font-medium'>{children}</td>;
};
