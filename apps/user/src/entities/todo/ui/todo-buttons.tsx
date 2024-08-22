import { Kebab, NoteView, NoteViewGroup } from '@jeiltodo/icons';
import { Flyout } from '@jeiltodo/ui/shared';
import { useState } from 'react';
import { MemgberInCharge } from '../model/type';

interface Props {
  onClickNote: () => void;
  onClickEdit: () => void;
  onClickRemove: () => void;
  isGroup?: boolean;
}
export const TodoButtons = ({
  onClickEdit,
  onClickRemove,
  onClickNote,
  isGroup = false,
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
    <div className='relative flex items-center' onMouseLeave={() => setFlyoutOpen(false)}>
      <span className='inline-flex items-center  gap-2 opacity-0 transition-opacity group-hover:opacity-100'>
        {isGroup ? (
          <NoteViewGroup
            width={24}
            height={24}
            onClick={onClickNote}
            className='cursor-pointer'
          />
        ) : (
          <NoteView
            width={24}
            height={24}
            onClick={onClickNote}
            className='cursor-pointer'
          />
        )}
        <Kebab
          width={24}
          height={24}
          onClick={handleKebab}
          className='cursor-pointer'
        />
      </span>
      {isFlyoutOpen && <Flyout onEdit={handleEdit} onDelete={handleRemove} />}
    </div>
  );
};
