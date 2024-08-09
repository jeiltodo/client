import { BlueMarker, Flag } from '@jeiltodo/icons';

interface Props {
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  title: string;
  className?: string;
}

export const BoardTitle = ({
  icon = 'BlueMarker',
  iconColor = '#1E293B',
  iconSize = 40,
  title,
  className,
}: Props) => {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {icon === 'BlueMarker' && (
        <BlueMarker width={iconSize} height={iconSize} />
      )}
      {icon === 'flag' && (
        <Flag width={iconSize} height={iconSize} color={iconColor} />
      )}

      <span
        className={`${iconSize !== 40 ? 'font-medium text-base' : 'font-semibold text-lg'} text-black-500`}
      >
        {title}
      </span>
    </div>
  );
};
