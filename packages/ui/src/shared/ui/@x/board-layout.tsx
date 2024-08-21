import { PropsWithChildren } from 'react';
import { BoardTitle } from '../board-title';

interface Props extends PropsWithChildren {
  title: string;
  className?: string;
}

export const BoardLayout = ({ title, children, className }: Props) => {
  return (
    <div className={`bg-white p-6 rounded-lg ${className}`}>
      <BoardTitle
        title={title}
        icon={title.includes('그룹') ? 'OrangeMarker' : 'BlueMarker'}
      />
      {children}
    </div>
  );
};
