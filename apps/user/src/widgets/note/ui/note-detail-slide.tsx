'use client';
import ReactDOM from 'react-dom';
import { DeleteMenu } from '@jeiltodo/icons';
import type { Note } from '@jeiltodo/ui/shared';
import { useEffect, useState } from 'react';
import { useNoteDetail } from '../../../entities/note/hooks/useNoteDetail';

interface NoteDetailSlideProps {
  noteId: number;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NoteDetailSlide = ({
  noteId,
  setToggle,
}: NoteDetailSlideProps) => {
  const [data, setData] = useState<Note | []>();

  const handleSlideClick = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
  };

  const { noteDetail, error, isLoading } = useNoteDetail(Number(noteId));

  useEffect(() => {
    console.log('노트 슬라이드 response: ', noteDetail);
    if (
      !isLoading &&
      Array.isArray(noteDetail) &&
      noteDetail.length > 0 &&
      !error
    ) {
      setData(noteDetail);
    } else if (!isLoading && !error && !Array.isArray(noteDetail)) {
      // noteDetail이 배열이 아니고 로딩이 끝났다면 (예: 객체인 경우)
      setData([noteDetail]);
    }
  }, [noteDetail, isLoading, error]);

  return ReactDOM.createPortal(
    <div
      role='button'
      tabIndex={0}
      onClick={() => {
        setToggle(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setToggle(false);
        }
      }}
      className='z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full y-full min-h-full bg-[#000000] bg-opacity-30'
    >
      <div
        role='button'
        tabIndex={0}
        onClick={handleSlideClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleSlideClick(e);
          }
        }}
        className={`absolute h-screen bg-white desktop:w-[800px] tablet:w-[512px] mobile:w-full fixed top-[0px] right-[0px]`}
      >
        <div className='flex items-center justify-between mb-6'>
          <div className='text-lg font-bold text-slate-800'>{data?.title}</div>
          <button
            type='button'
            onClick={() => setToggle(false)}
            className='cursor-pointer'
          >
            <DeleteMenu className='w-6 h-6' />
          </button>
        </div>
        <div>{data?.content}</div>
      </div>
    </div>,
    document.body
  );
};
