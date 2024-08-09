import { Meatball, NoteList } from '@jeiltodo/icons';
import { TodoTitle } from '@jeiltodo/ui/shared';

interface CardProps {
  noteId: number;
  noteTitle: string;
  todoId: number;
  todoTitle: string;
  handleSlideOpen: (arg: number) => void;
}

export const Card = ({ noteId, noteTitle, todoId, todoTitle }: CardProps) => {
  // const onRoute = () => {
  //   //useParams로 goalId가져와서 noteId와 todoId 넣어서 url만들기
  // };
  return (
    <div className='flex flex-col gap-y-[12px] bg-white rounded-[12px] p-[24px] mb-[12px]'>
      <div className='flex flex-row items-start justify-between'>
        <NoteList width={28} height={28} />
        <span className='flex items-center justify-center w-[24px] h-[24px] rounded-full bg-slate-50'>
          {/* flyoutmenu로 대체 */}
          <Meatball width={14} height={14} />
        </span>
      </div>
      <h2 className='text-lg font-pretendard-medium'>{noteTitle}</h2>
      <span className='w-full h-[1px] bg-slate-200'></span>
      <TodoTitle title={todoTitle} />
    </div>
  );
};
