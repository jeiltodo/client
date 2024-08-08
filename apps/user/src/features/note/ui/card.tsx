import { Meatball, NoteList } from '@jeiltodo/icons';

interface CardProps {
  noteId: number;
  noteTitle: string;
  todoId: number;
  todoTitle: string;
}

export const Card = ({ noteId, noteTitle, todoId, todoTitle }: CardProps) => {
  const onRoute = () => {
    //useParams로 goalId가져와서 noteId와 todoId 넣어서 url만들기
  };
  return (
    <div>
      <div>
        <NoteList width={28} height={28} />
        <span className='flex items-center justify-center w-[24px] h-[24px] rounded-full bg-slate-50'>
          <Meatball width={14} height={14} />
        </span>
      </div>
    </div>
  );
};
