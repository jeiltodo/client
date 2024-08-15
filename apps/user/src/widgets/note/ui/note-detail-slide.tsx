'use client';
import ReactDOM from 'react-dom';
import { DeleteMenu } from '@jeiltodo/icons';
import {
  BoardTitle,
  Button,
  ButtonGroup,
  TodoTitle,
  type Note,
} from '@jeiltodo/ui/shared';
import { useEffect, useState } from 'react';
import { useNoteDetail } from '../../../entities/note/hooks/useNoteDetail';
import { useParams, useRouter } from 'next/navigation';
import { deleteNote } from '../../../entities/note';

interface NoteDetailSlideProps {
  data: Note;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NoteDetailSlide = ({ data, setToggle }: NoteDetailSlideProps) => {
  const [noteData, setNoteData] = useState<Note>();
  const route = useRouter();
  const params = useParams();
  const goalid = params?.goalid as string;

  const handleSlideClick = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
  };

  const handleRoute = () => {
    route.push(`/note/${goalid}/${data.todo.id}/${data.id}`);
  };

  const handleDelete = () => {
    const noteId = data.id;
    const response = deleteNote({ noteId });
  };

  const { noteDetail, error, isLoading } = useNoteDetail(Number(data.id));

  useEffect(() => {
    if (!isLoading && noteDetail?.data && !error) {
      const queryData = noteDetail.data;
      setNoteData(queryData);
    }
  }, [noteDetail, isLoading, error]);

  return ReactDOM.createPortal(
    //modal
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
              title={noteData?.todo.goal?.title || ''}
              icon='flag'
              iconSize={24}
            />
            <ButtonGroup gap={2}>
              <Button
                className='w-[84px] h-[36px]'
                variant='outline'
                onClick={handleRoute}
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
            <TodoTitle title={noteData?.todo.title || ''} />
            <span className='text-slate-500 text-xs'>
              {noteData?.createdAt}
            </span>
          </div>
          <div className='text-lg font-pretendard-medium text-slate-800 border-y border-slate-200 py-3 mb-4'>
            {noteData?.title}
          </div>
        </div>
        <div className='text-base font-pretendard-regular'>
          {noteData?.content}
        </div>
      </div>
    </div>,
    document.body
  );
};
