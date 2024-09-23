import { Trash } from '@jeiltodo/icons';

interface DeleteButtonProps {
  onDelete: () => void;
}

export function DeleteButton({ onDelete }: DeleteButtonProps) {
  return (
    <Trash
      className='cursor-pointer'
      height={24}
      onClick={onDelete}
      width={24}
    />
  );
}
