import { NoteList, Meatball } from '@jeiltodo/icons';
import { Flyout, TodoTitle } from '@jeiltodo/ui/shared';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { deleteNote } from '../../../entities/note';

interface CardProps {
  noteId: number;
  noteTitle: string;
  todoId: number;
  todoTitle: string;
  handleSlideOpen: (arg: number) => void;
}

export const Card = ({ noteId, noteTitle, todoId, todoTitle }: CardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const route = useRouter();
  const params = useParams();
  const goalid = params?.goalid as string;

  const handleMeatball = () => {
    setIsOpen((prev) => !prev);
  };

  const handleRoute = () => {
    route.push(`/note/${goalid}/${todoId}/${noteId}`);
  };
  const handleDelete = () => {
    const response = deleteNote({ noteId });
    console.log('deleteNote response: ', response);
  };
  return (
    <div className='flex flex-col gap-y-[12px] bg-white rounded-[12px] p-[24px] mb-[12px]'>
      <div className='flex flex-row items-start justify-between'>
        <NoteList width={28} height={28} />
        <span className='inline-flex items-center gap-2 relative'>
          <span className='flex items-center justify-center w-[24px] h-[24px] rounded-full bg-slate-50'>
            <Meatball
              width={14}
              height={14}
              onClick={handleMeatball}
              fill={'red'}
              className='cursor-pointer '
            />
          </span>

          {isOpen && <Flyout onEdit={handleRoute} onDelete={handleDelete} />}
        </span>
      </div>
      <h2 className='text-lg font-pretendard-medium'>{noteTitle}</h2>
      <span className='w-full h-[1px] bg-slate-200'></span>
      <TodoTitle title={todoTitle} />
    </div>
  );
};
