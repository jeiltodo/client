'use client';
import ReactDOM from 'react-dom';
import { DeleteMenu } from '@jeiltodo/icons';
import { formatDateString } from '@jeiltodo/lib';
import {
  BoardTitle,
  Button,
  ButtonGroup,
  TodoTitle,
} from '@jeiltodo/ui/shared';
import { useNoteDetail } from '../../../entities/note/hooks/useNoteDetail';
import { useDeleteNote } from '../../../entities/note';
import { useRouter } from 'next/navigation';

interface NoteDetailSlideProps {
  goalId: number;
  goalTitle: string;
  noteId: number;
  todoId: number;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NoteDetailSlide = ({
  goalId,
  goalTitle,
  noteId,
  todoId,
  setToggle,
}: NoteDetailSlideProps) => {
  const router = useRouter();
  const { noteDetail } = useNoteDetail(String(noteId));
  const { mutate: deleteNote } = useDeleteNote(noteId);

  const handleSlideClick = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
  };

  const handleEdit = () => {
    const url = noteDetail?.id
      ? `/note/${goalId}/${todoId}/${noteDetail.id}?title=${goalTitle}`
      : `/note/${goalId}/${todoId}/new?title=${goalTitle}`;
    router.push(url);
  };

  const handleDelete = () => {
    deleteNote();
    //삭제하시겠습니까 빠졌어요..
    setToggle(false);
  };

  return ReactDOM.createPortal(
    <div
      className='z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full y-full min-h-full bg-[#000000] bg-opacity-30'
      onClick={() => {
        setToggle(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setToggle(false);
        }
      }}
      role='button'
      tabIndex={0}
    >
      {/* slide */}
      <div
        className='p-6 pb-8 h-screen bg-white desktop:w-[800px] tablet:w-[512px] mobile:w-full fixed top-[0px] right-[0px]'
        onClick={handleSlideClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleSlideClick(e);
          }
        }}
        role='button'
        tabIndex={0}
      >
        <div className=''>
          <button
            type='button'
            onClick={() => setToggle(false)}
            className='cursor-pointer mb-4'
          >
            <DeleteMenu className='w-6 h-6' />
          </button>
          <div className='flex felx-row items-center justify-between mb-3'>
            <BoardTitle
              title={noteDetail?.todo.goal.title || ''}
              icon='flag'
              iconSize={24}
            />
            <ButtonGroup gap={2}>
              <Button
                className='w-[84px] h-[36px]'
                variant='outline'
                onClick={handleEdit}
              >
                수정하기
              </Button>
              <Button
                className='w-[84px] h-[36px]'
                variant='primary'
                onClick={handleDelete}
              >
                삭제하기
              </Button>
            </ButtonGroup>
          </div>
          <div className='flex felx-row items-center justify-between mb-6'>
            <TodoTitle title={noteDetail?.todo.title || ''} />
            {noteDetail?.createdAt && (
              <span className='text-slate-500 text-xs'>
                {formatDateString(noteDetail.createdAt)}
              </span>
            )}
          </div>
          <div className='text-lg font-pretendard-medium text-slate-800 border-y border-slate-200 py-3 mb-4'>
            {noteDetail?.title}
          </div>
        </div>
        <div className='text-base font-pretendard-regular'>
          {noteDetail?.content}
        </div>
      </div>
    </div>,
    document.body
  );
};
