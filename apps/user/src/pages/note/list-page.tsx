'use client';

import { LayoutTitle, NoteDetailSlide } from '@jeiltodo/ui/shared';
import { CardListBoard } from '../../widgets/note/ui/card-list-board';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useGoalNotes } from '../../entities/note/hooks/useGoalNotes';
import { NoteResponse } from '../../entities/note';

export const ListPage = () => {
  const [isSlideOpen, setIsSlideOpen] = useState<boolean>(false);
  const params = useParams();
  const goalid = params?.goalid as string;

  const page = 1;
  const limit = 10;

  const { goalNotes, error, isLoading } = useGoalNotes({
    goalid: Number(goalid),
    page,
    limit,
  });

  const handleSlideOpen = (noteid: number) => {
    if (noteid) {
      setIsSlideOpen((prev) => !prev);
    }
  };
  return (
    <div className='max-w-[792px]'>
      <LayoutTitle title={`노트 모아보기`} />
      {!isLoading && goalNotes && goalNotes.data && (
        <CardListBoard
          handleSlideOpen={handleSlideOpen}
          cardListData={goalNotes?.data}
        />
      )}
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
