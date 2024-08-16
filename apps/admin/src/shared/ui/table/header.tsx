import type { ReactNode } from 'react';

export const TableHeader: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <thead className='border-t border-b border-slate-400'>{children}</thead>
  );
};
