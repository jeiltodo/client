import { PropsWithChildren } from 'react';
import { BoardTitle } from '../board-title';

interface BoardLayoutProps extends PropsWithChildren {
  title: string;
  className?: string;
  isAdmin?: boolean;
}

export const BoardLayout = ({
  title,
  children,
  className,
  isAdmin = false,
}: BoardLayoutProps) => {
  const getIconType = () => {
    if (title.includes('그룹')) {
      return !isAdmin ? 'OrangeMarker' : 'BlueMarker';
    }
    return 'BlueMarker';
  };
  return (
    <div className={`bg-white p-6 rounded-lg ${className}`}>
      <BoardTitle icon={getIconType()} title={title} />
      {children}
    </div>
  );
};
