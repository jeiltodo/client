import { Trash } from '@jeiltodo/icons';

interface DeleteButtonProps {
  onDelete: () => void;
}

export function DeleteButton({ onDelete }: DeleteButtonProps) {
  return (
    <Trash
      onClick={onDelete}
      width={24}
      height={24}
      className='cursor-pointer'
    />
  );
}
