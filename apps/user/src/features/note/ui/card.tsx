import { NoteList, Meatball } from '@jeiltodo/icons';
import { Flyout, TodoTitle } from '@jeiltodo/ui/shared';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { deleteNote } from '../../../entities/note';
import { NoteDetailSlide } from '../../../widgets/note/ui/note-detail-slide';

interface CardProps {
  noteId: number;
  noteTitle: string;
  todoId: number;
  todoTitle: string;
}

export const Card = ({ noteId, noteTitle, todoId, todoTitle }: CardProps) => {
  const [isSlideOpen, setIsSlideOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const route = useRouter();
  const params = useParams();
  const goalid = params?.goalid as string;

  const handleSlideOpen = () => {
    console.log('noteId: ', noteId);
    if (noteId) {
      setIsSlideOpen((prev) => !prev);
    }
  };

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
    <div
      role='button'
      tabIndex={0}
      className='flex flex-col gap-y-[12px] bg-white rounded-[12px] p-[24px] mb-[12px]'
      onClick={handleSlideOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleSlideOpen();
        }
      }}
    >
      <div className='flex flex-row items-start justify-between'>
        <NoteList width={28} height={28} />
        <span className='inline-flex items-center gap-2 relative'>
          <span className='flex items-center ju w-[24px] h-[24px] rounded-full bg-slate-50'>
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

      {isSlideOpen && (
        <NoteDetailSlide noteId={noteId} setToggle={setIsSlideOpen} />
      )}
    </div>
  );
};
