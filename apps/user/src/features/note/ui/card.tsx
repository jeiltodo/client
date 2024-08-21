'use client';
import { NoteList, Kebab } from '@jeiltodo/icons';
import type { Note } from '@jeiltodo/ui/shared';
import { CardFlyout, TodoTitle } from '@jeiltodo/ui/shared';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NoteDetailSlide } from '../../../widgets/note/ui/note-detail-slide';
import { ConfirmationModal } from '../../../shared';
import { useDeleteNote } from '../../../entities/note/hooks/useDeleteNote';

interface CardProps {
  noteData: Note;
  goal: { id: number; title: string };
}

export const Card = ({ noteData, goal }: CardProps) => {
  const [noteSlideModalId, setNoteSlideModalId] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const router = useRouter();

  const handleSlideOpen = () => {
    setNoteSlideModalId(noteData.id);
  };

  const handleKebab = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleRoute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const url = `/note/${noteData.todo.goal.id}/${noteData.todo.id}/${noteData.id}?title=${noteData.todo.goal.title}`;

    router.push(url);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsConfirmOpen(true);
  };
  const { mutate: deleteNote } = useDeleteNote(noteData.id);
  const onDelete = () => {
    deleteNote();
    setIsConfirmOpen(false);
  };

  useEffect(() => {
    console.log(noteSlideModalId, 'chage');
  }, [noteSlideModalId]);

  return (
    <div
      className='flex flex-col gap-y-[12px] bg-white rounded-[12px] p-[24px] mb-[12px]'
      onClick={handleSlideOpen}
    >
      <div className='flex flex-row items-start justify-between'>
        <div className='w-full flex justify-between'>
          <div className='flex gap-4'>
            <NoteList width={28} height={28} />
            <h2 className='text-lg font-pretendard-medium'>{noteData.title}</h2>
          </div>
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

            {isOpen && (
              <CardFlyout
                onEdit={(e) => handleRoute(e)}
                onDelete={(e) => handleDelete(e)}
              />
            )}
          </span>
        </div>
      </div>
      <span className='w-full h-[1px] bg-slate-200' />
      <TodoTitle title={noteData.todo.title} />

      {noteSlideModalId !== null && noteSlideModalId === noteData.id && (
        <NoteDetailSlide
          goalId={goal.id}
          goalTitle={goal.title}
          noteId={noteData.id}
          todoId={noteData.todo.id}
          setToggle={() => setNoteSlideModalId(null)}
        />
      )}
      {isConfirmOpen && (
        <ConfirmationModal
          setModalToggle={setIsConfirmOpen}
          submitButtonText='삭제'
          onSubmit={() => onDelete()}
        >
          정말 삭제 하시겠어요?
        </ConfirmationModal>
      )}
    </div>
  );
};
