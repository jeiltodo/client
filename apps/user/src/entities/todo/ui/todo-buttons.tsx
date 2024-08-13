import { Kebab, NoteView } from '@jeiltodo/icons';
import { Flyout } from '@jeiltodo/ui/shared';
import { useState } from 'react';

interface Props {
  onClickNote: () => void;
  onClickEdit: () => void;
  onClickRemove: () => void;
}
export const TodoButtons = ({
  onClickEdit,
  onClickRemove,
  onClickNote,
}: Props) => {
  const [isFlyoutOpen, setFlyoutOpen] = useState(false);

  const handleKebab = () => {
    setFlyoutOpen((prev) => !prev);
  };

  const handleEdit = () => {
    onClickEdit();
    setFlyoutOpen(false);
  };

  const handleRemove = () => {
    onClickRemove();
    setFlyoutOpen(false);
  };
  return (
    <span className='inline-flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 relative'>
      <NoteView width={24} height={24} onClick={onClickNote} />
      <Kebab
        width={24}
        height={24}
        onClick={handleKebab}
        className='cursor-pointer '
      />

      {isFlyoutOpen && <Flyout onEdit={handleEdit} onDelete={handleRemove} />}
    </span>
  );
};
