'use client';
import { createPortal } from 'react-dom';
import { DeleteMenu, LinkEmbed } from '@jeiltodo/icons';
import {
  BoardTitle,
  Button,
  formatDateString,
  LoadingSpinner,
  TodoTitle,
} from '@jeiltodo/ui/shared';
import { useDeleteNoteMutation, useNoteDetail } from '../hooks';

interface NoteDetailSlideProps {
  goalTitle: string;
  noteId: number;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NoteDetailSlide = ({
  goalTitle,
  noteId,
  setToggle,
}: NoteDetailSlideProps) => {
  const { data: noteDetail, isLoading } = useNoteDetail(noteId);
  const { mutate: deleteNote } = useDeleteNoteMutation();

  const markDownText = `${noteDetail?.data.content}`;

  const handleDelete = (selectedNoteId: number) => {
    deleteNote(selectedNoteId);
    setToggle(false);
  };

  return createPortal(
    <div className='z-30 left-0 top-0 fixed flex w-full h-screen'>
      <button
        className='w-full y-full bg-[#000000] opacity-50 mobile:hidden tablet:block'
        onClick={(e) => {
          e.stopPropagation();
          setToggle(false);
        }}
        type='button'
      />
      {/* slide */}
      <div className='p-6 pb-8 h-screen bg-white desktop:!w-[800px] tablet:!w-[512px] w-full fixed top-[0px] right-[0px]'>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className='flex flex-col'>
            <div>
              <button
                className='cursor-pointer mb-4'
                onClick={(e) => {
                  e.stopPropagation();
                  setToggle(false);
                }}
                type='button'
              >
                <DeleteMenu className='w-6 h-6' />
              </button>
              <div className='flex felx-row items-center justify-between mb-3'>
                <BoardTitle icon='flag' iconSize={24} title={goalTitle} />
                <Button
                  className='w-[64px] text-sm tablet:w-[74px] tablet:text-lg desktop:w-[74px] desktop:text-lg h-[36px]'
                  onClick={() => {
                    handleDelete(noteId);
                  }}
                  variant='primary'
                >
                  삭제하기
                </Button>
              </div>
              <div className='flex flex-col items-start gap-1 mb-6'>
                <TodoTitle title={noteDetail?.data.todoTitle || ''} />
                <div className='text-slate-400 text-xs font-medium flex items-center justify-start gap-[22px]'>
                  <div>작성자</div>
                  {noteDetail?.data.writer.nickname ? (
                    <span className='text-slate-600'>
                      {noteDetail.data.writer.nickname}
                    </span>
                  ) : null}
                </div>
                <div className='text-slate-400 text-xs font-medium flex items-center justify-start gap-2'>
                  <div>수정 일자</div>
                  {noteDetail?.data.updatedAt ? (
                    <span className='text-slate-600'>
                      {formatDateString(noteDetail.data.updatedAt)}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className='text-lg font-pretendard-medium text-slate-800 border-y border-slate-200 py-3 mb-4'>
                {noteDetail?.data.title}
              </div>
            </div>
            <div className='text-base font-pretendard-regular flex flex-col gap-4'>
              {noteDetail?.data.linkUrl ? (
                <div className='flex items-center justify-start gap-2 bg-slate-200 h-[38px] py-[7px] px-[6px] rounded-[20px] w-full mt-1'>
                  <LinkEmbed className='h-[18px] w-[18px]' />
                  <div className='text-base font-normal text-slate-800 truncate pt-[2px]'>
                    {noteDetail.data.linkUrl}
                  </div>
                </div>
              ) : null}
              <div dangerouslySetInnerHTML={{ __html: markDownText }} />
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
