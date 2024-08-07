import { NoteView, NoteWrite } from '@jeiltodo/icons';

interface Props {
  onClickNote: () => void;
  onClickEdit: () => void;
}
export const TodoButtons = ({ onClickEdit, onClickNote }: Props) => {
  return (
    <span className='inline-flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100'>
      <NoteWrite width={24} height={24} onClick={onClickEdit} />
      <NoteView width={24} height={24} onClick={onClickNote} />
    </span>
  );
};
