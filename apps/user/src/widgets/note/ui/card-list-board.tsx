import { NoteResponse } from '../../../entities/note';
import { Response } from '../../../entities/session';
import { Card, GoalTitleCard } from '../../../features/note';

interface CardListBoardProps {
  handleSlideOpen: (arg: number) => void;
  cardListData: NoteResponse;
}

export const CardListBoard = ({
  handleSlideOpen,
  cardListData,
}: CardListBoardProps) => {
  const goalTitle = '목표의 제목';

  return (
    <>
      <GoalTitleCard title={goalTitle} />
      {cardListData?.notes?.map((note) => (
        <Card
          key={note.id}
          noteId={note.id}
          noteTitle={note.title}
          todoId={note.todo.id}
          todoTitle={note.todo.title}
          handleSlideOpen={handleSlideOpen}
        />
      ))}
    </>
  );
};
