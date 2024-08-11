'use client';

import { LayoutTitle, NoteDetailSlide } from '@jeiltodo/ui/shared';
import { CardListBoard } from '../../widgets/note/ui/card-list-board';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getGoalNoteList } from '../../entities/goal';
import { useQuery } from '@tanstack/react-query';

export const ListPage = () => {
	const [isSlideOpen, setIsSlideOpen] = useState<boolean>(false);
	const params = useParams();
	console.log('goalid: ', params);
	const goalid = 9;
	const page = 1;
	const limit = 0;

	const { data, isLoading, error } = useQuery({
		queryKey: ['goalNoteList', goalid, page, limit], // 쿼리 키
		queryFn: () => getGoalNoteList({ goalid, page, limit }), // 쿼리 함수
		enabled: !!goalid, // 쿼리 실행 조건
	});

	console.log('error: ', error);
	console.log('isLoading: ', isLoading);
	console.log('data: ', data);

	const handleSlideOpen = (noteid: number) => {
		console.log('열리는 노트 noteid', noteid);
		if (noteid) {
			setIsSlideOpen((prev) => !prev);
		}
	};
	return (
		<div className='max-w-[792px]'>
			<LayoutTitle title={`노트 모아보기`} />
			<CardListBoard handleSlideOpen={handleSlideOpen} />
			{isSlideOpen && (
				<NoteDetailSlide
					data={{ title: '노트 제목', content: '노트 본문' }}
					isSlideOpen={isSlideOpen}
					handleSlideOpen={handleSlideOpen}
				/>
			)}
		</div>
	);
};
