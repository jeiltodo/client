import { BlueMarker, Flag, OrangeMarker } from '@jeiltodo/icons';

interface BoardTitleProps {
  icon?: string;
  flagColor?: string;
  iconSize?: number;
  title: string;
  className?: string;
}

export const BoardTitle = ({
  icon = 'BlueMarker',
  flagColor = '#1E293B',
  iconSize = 40,
  title,
  className,
}: BoardTitleProps) => {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <span className='rounded-[15px] overflow-hidden'>
        {icon === 'OrangeMarker' && (
          <OrangeMarker height={iconSize} width={iconSize} />
        )}
        {icon === 'BlueMarker' && (
          <BlueMarker height={iconSize} width={iconSize} />
        )}
        {icon === 'flag' && (
          <Flag color={flagColor} height={iconSize} width={iconSize} />
        )}
      </span>
      <span
        className={`${iconSize !== 40 ? 'font-medium text-base' : 'font-semibold text-lg'} text-black-500`}
      >
        {title}
      </span>
    </div>
  );
};
