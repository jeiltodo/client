import { PropsWithChildren } from 'react';
import { BoardTitle } from '../board-title';

interface Props extends PropsWithChildren {
  title: string;
  className?: string;
}

export const BoardLayout = ({ title, children, className }: Props) => {
  return (
    <div className={`h-[364px] bg-white p-6 rounded-lg ${className}`}>
      <BoardTitle title={title} />
      {children}
    </div>
  );
};
