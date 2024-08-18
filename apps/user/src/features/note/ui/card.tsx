import { NoteList, Kebab } from '@jeiltodo/icons';
import type { Note } from '@jeiltodo/ui/shared';
import { CardFlyout, TodoTitle } from '@jeiltodo/ui/shared';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { NoteDetailSlide } from '../../../widgets/note/ui/note-detail-slide';
import { ConfirmationModal } from '../../../shared';
import { useDeleteNote } from '../../../entities/note/hooks/useDeleteNote';

interface CardProps {
	noteData: Note;
}

export const Card = ({ noteData }: CardProps) => {
	const [isSlideOpen, setIsSlideOpen] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

	const route = useRouter();

	const handleSlideOpen = () => {
		if (noteData.id) {
			setIsSlideOpen((prev) => !prev);
		}
	};

	const handleKebab = (e: React.MouseEvent<SVGSVGElement>) => {
		e.stopPropagation();
		setIsOpen((prev) => !prev);
	};

	const handleRoute = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		route.push(`/note/${noteData.todo.id}?noteId=${noteData.id || 'new'}`);
	};
	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setIsConfirmOpen(true);
	};
	const { mutate: deleteNote } = useDeleteNote();
	const onDelete = () => {
		const noteId = Number(noteData.id);
		deleteNote(noteId);
		setIsConfirmOpen(false);
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

					{isOpen && (
						<CardFlyout
							onEdit={(e) => handleRoute(e)}
							onDelete={(e) => handleDelete(e)}
						/>
					)}
				</span>
			</div>
			<h2 className='text-lg font-pretendard-medium'>{noteData.title}</h2>
			<span className='w-full h-[1px] bg-slate-200' />
			<TodoTitle title={noteData.todo.title} />

			{isSlideOpen && (
				<NoteDetailSlide
					noteId={noteData.id}
					todoId={noteData.todo.id}
					setToggle={setIsSlideOpen}
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
