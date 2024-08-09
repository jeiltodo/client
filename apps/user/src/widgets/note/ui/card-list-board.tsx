import { Card, GoalTitleCard } from '../../../features/note';

interface CardListBoardProps {
  handleSlideOpen: (arg: number) => void;
}

export const CardListBoard = ({ handleSlideOpen }: CardListBoardProps) => {
  const goalTitle = '목표의 제목';
  const noteDataArray = [
    {
      noteId: 1,
      noteTitle: '자바스크립트를 배우기 전 알아두어야 할 것',
      todoId: 1,
      todoTitle: '자바스크립트 기초 챕터1 듣기',
    },
    {
      noteId: 2,
      noteTitle: '자바스크립트를 시작하기 전 준비물',
      todoId: 2,
      todoTitle: '자바스크립트 기초 챕터2 듣기',
    },
    {
      noteId: 3,
      noteTitle: '프로그래밍 시작하기 in JavaScript',
      todoId: 3,
      todoTitle: '자바스크립트 기초 챕터3 듣기',
    },
    {
      noteId: 4,
      noteTitle: '프로그래밍과 데이터 in JavaScript',
      todoId: 4,
      todoTitle: '자바스크립트 기초 챕터4 듣기',
    },
  ];

  return (
    <>
      <GoalTitleCard title={goalTitle} />
      {noteDataArray.map((note) => (
        <Card
          key={note.noteId}
          noteId={note.noteId}
          noteTitle={note.noteTitle}
          todoId={note.todoId}
          todoTitle={note.todoTitle}
          handleSlideOpen={handleSlideOpen}
        />
      ))}
    </>
  );
};
