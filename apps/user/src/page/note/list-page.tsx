import { LayoutTitle } from '@jeiltodo/ui/shared';
import { CardListBoard } from '../../widgets/note/ui/card-list-board';

export const ListPage = () => {
  return (
    <div className='max-w-[792px]'>
      <LayoutTitle title='노트 모아보기' />
      <CardListBoard />
    </div>
  );
};
