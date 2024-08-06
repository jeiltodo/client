import type { ReactNode } from 'react';

export const TableBody: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <tbody>{children}</tbody>;
};
