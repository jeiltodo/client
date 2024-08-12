import { NoteResponse } from '../../../entities/note';
import { Card, GoalTitleCard } from '../../../features/note';

interface CardListBoardProps {
  cardListData: NoteResponse;
}

export const CardListBoard = ({ cardListData }: CardListBoardProps) => {
  console.log('cardListData: ', cardListData);
  const goalTitle = '목표의 제목';

  return (
    <>
      <GoalTitleCard title={goalTitle} />
      {cardListData?.notes?.map((note) => <Card key={note.id} data={note} />)}
    </>
  );
};
