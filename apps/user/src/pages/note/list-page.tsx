'use client';

import { LayoutTitle } from '@jeiltodo/ui/shared';
import { CardListBoard } from '../../widgets/note/ui/card-list-board';
import { useParams } from 'next/navigation';
import { useGoalNotes } from '../../entities/note/hooks/useGoalNotes';

export const ListPage = () => {
  const params = useParams();
  const goalid = params?.goalid as string;

  const page = 1;
  const limit = 10;

  const { goalNotes, error, isLoading } = useGoalNotes({
    goalid: Number(goalid),
    page,
    limit,
  });

  return (
    <div className='max-w-[792px]'>
      <LayoutTitle title={`노트 모아보기`} />
      {!isLoading && goalNotes && goalNotes.data && (
        <CardListBoard cardListData={goalNotes?.data} />
      )}
    </div>
  );
};
