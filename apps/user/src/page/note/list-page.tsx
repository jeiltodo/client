import { LayoutTitle } from '@jeiltodo/ui/shared';
import { CardListBoard } from '../../widgets/note/ui/card-list-board';

export const ListPage = () => {
  return (
    <div
      className='max-w-[792px] flex flex-col'
      style={{ minHeight: 'calc(100vh - 24px)' }}
    >
      <LayoutTitle title='노트 모아보기' />
      <div className='flex-1 overflow-hidden'>
        <CardListBoard />
      </div>
    </div>
  );
};
