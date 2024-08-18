'use client';
import { useSearchParams } from 'next/navigation';
import { Card, GoalTitleCard } from '../../../features/note';
import { useGoalNotes } from '../../../entities/note/hooks/useGoalNotes';

export const CardListBoard = () => {
	const searchParams = useSearchParams();
	const goalId = searchParams.get('goalId');
	const goalTitle = searchParams.get('goalTitle');
	const { data: cardListData, isLoading } = useGoalNotes({
		goalId: Number(goalId),
		page: 1,
		limit: 10,
	});

	console.log('cardListData: ', cardListData);

	return (
		<div className='flex flex-col flex-grow h-full'>
			<div className='flex-1 flex flex-col'>
				{!isLoading && cardListData?.data.notes.length ? (
					<>
						<GoalTitleCard title={cardListData.data.notes[0].todo.goal.title} />
						<div className='flex-1 overflow-auto'>
							{cardListData.data.notes.map((note) => (
								<Card noteData={note} key={note.id} />
							))}
						</div>
					</>
				) : (
					<>
						<GoalTitleCard title={goalTitle} />
						<div className='flex-1 flex justify-center items-center'>
							<p className='text-sm text-slate-500'>
								아직 등록된 노트가 없어요
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
