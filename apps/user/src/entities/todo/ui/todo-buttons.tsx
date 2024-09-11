import { Kebab, NoteView, NoteViewGroup } from '@jeiltodo/icons';
import { Flyout } from '@jeiltodo/ui/shared';
import { useState } from 'react';

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
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

  const handleKebab = () => {
    setIsFlyoutOpen((prev) => !prev);
  };

  const handleEdit = () => {
    onClickEdit();
    setIsFlyoutOpen(false);
  };

  const handleRemove = () => {
    onClickRemove();
    setIsFlyoutOpen(false);
  };

  return (
    <div className='relative flex items-center' onMouseLeave={() => setIsFlyoutOpen(false)}>
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
