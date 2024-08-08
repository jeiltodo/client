import { BoardTitle, LayoutTitle } from '@jeiltodo/ui/shared';
import { CardListBoard } from '../../widgets/note/ui/card-list-board';

export const ListPage = () => {
  return (
    <>
      <LayoutTitle title={`노트 모아보기`} />
      <BoardTitle
        className='mb-[12px]'
        icon='flag'
        iconSize={24}
        title='자바스크립트로 웹 서비스 만들기'
      />
      <CardListBoard />
    </>
  );
};
