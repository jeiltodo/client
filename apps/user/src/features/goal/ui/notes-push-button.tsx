import { ArrowRight, Note } from '@jeiltodo/icons';
import type { Goal } from '@jeiltodo/ui/shared';

export const NotesPushButton = ({ goalData }: { goalData: Goal }) => {
	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			className='flex justify-between px-6 py-4 rounded-lg bg-blue-100 hover:transform group cursor-pointer'
			onClick={() => {
				window.location.href = `/note/list?goalId=${goalData.id}&goalTitle=${goalData.title}`;
			}}
		>
			<div className='flex gap-x-2 items-center justify-between'>
				<Note width={24} height={24} />
				<p>노트 모아보기</p>
			</div>
			<ArrowRight
				width={24}
				height={24}
				// className='group-hover:transform group-hover:translate-x-1 transition-transform duration-500'
			/>
		</div>
	);
};
