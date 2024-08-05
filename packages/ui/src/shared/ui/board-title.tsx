import { BlueMarker } from '@jeiltodo/icons';

interface Props {
  title: string;
  className?: string;
}

export const BoardTitle = ({ title, className }: Props) => {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <BlueMarker width={40} height={40} />
      <span className='font-semibold text-lg text-black-500'>{title}</span>
    </div>
  );
};
