import { NoteList, Kebab } from '@jeiltodo/icons';
import { Flyout, Note, TodoTitle } from '@jeiltodo/ui/shared';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { deleteNote } from '../../../entities/note';
import { NoteDetailSlide } from '../../../widgets/note/ui/note-detail-slide';

interface CardProps {
  data: Note;
}

export const Card = ({ data }: CardProps) => {
  const [isSlideOpen, setIsSlideOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const route = useRouter();
  const params = useParams();
  const goalid = params?.goalid as string;

  const handleSlideOpen = () => {
    if (data.id) {
      setIsSlideOpen((prev) => !prev);
    }
  };

  const handleKebab = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleRoute = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    route.push(`/note/${goalid}/${data.todo.id}/${data.id}`);
  };
  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log('삭제 요청');
    // const noteId = data.id;
    // const response = deleteNote({ noteId });
    //TODO :: 삭제 에러 확인중
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
          <span className='flex items-center justify-center w-[24px] h-[24px] rounded-full bg-slate-50'>
            <Kebab
              width={18}
              height={18}
              onClick={handleKebab}
              fill='red'
              className='cursor-pointer '
            />
          </span>

          {/* {isOpen && <Flyout onEdit={handleRoute} onDelete={handleDelete} />} */}
        </span>
      </div>
      <h2 className='text-lg font-pretendard-medium'>{data.title}</h2>
      <span className='w-full h-[1px] bg-slate-200'></span>
      <TodoTitle title={data.todo.title} />

      {isSlideOpen && (
        <NoteDetailSlide data={data} setToggle={setIsSlideOpen} />
      )}
    </div>
  );
};
