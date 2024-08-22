import { LayoutTitle } from '@jeiltodo/ui/shared';
import { NoteListBoard } from '../../widgets/note/ui/note-list-board';

export const ListPage = () => {
  return (
    <div
      className='max-w-[792px] flex flex-col'
      style={{ minHeight: 'calc(100vh - 48px)' }}
    >
      <LayoutTitle title='노트 모아보기' />
      <NoteListBoard />
    </div>
  );
};
