import { PropsWithChildren } from 'react';
import { BoardTitle } from '../board-title';

interface Props extends PropsWithChildren {
  title: string;
  className?: string;
  isAdmin?: boolean;
}

export const BoardLayout = ({
  title,
  children,
  className,
  isAdmin = false,
}: Props) => {
  return (
    <div className={`bg-white p-6 rounded-lg ${className}`}>
      <BoardTitle
        title={title}
        icon={
          title.includes('그룹')
            ? !isAdmin
              ? 'OrangeMarker'
              : 'BlueMarker'
            : 'BlueMarker'
        }
      />
      {children}
    </div>
  );
};
