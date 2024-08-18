import { ArrowRight, Note } from '@jeiltodo/icons';
import type { Goal } from '@jeiltodo/ui/shared';
import Link from 'next/link';

export const NotesPushButton = ({ goalData }: { goalData: Goal }) => {
	return (
		<Link
			className='flex justify-between px-6 py-4 rounded-lg bg-blue-100 hover:transform group cursor-pointer'
			href={{
				pathname: `/note/[goalid]/list`,
				query: { goalData: JSON.stringify(goalData) },
			}}
			as={`/note/${goalData.id}/list`}
		>
			<>
				<div className='flex gap-x-2 items-center justify-between'>
					<Note width={24} height={24} />
					<p>노트 모아보기</p>
				</div>
				<ArrowRight
					width={24}
					height={24}
					className='group-hover:transform group-hover:translate-x-1 transition-transform duration-500'
				/>
			</>
		</Link>
	);
};
