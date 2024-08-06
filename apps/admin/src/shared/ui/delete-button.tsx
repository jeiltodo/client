import { Trash } from '@jeiltodo/icons';

interface Props {
  onDelete: () => void;
}

export function DeleteButton({ onDelete }: Props) {
  return (
    <Trash
      onClick={onDelete}
      width={24}
      height={24}
      className='cursor-pointer'
    />
  );
}
