'use client';
import { useParams } from 'next/navigation';
import { Card, GoalTitleCard } from '../../../features/note';
import { useGoalNotes } from '../../../entities/note/hooks/useGoalNotes';

export const CardListBoard = () => {
  const goalTitle = '목표의 제목';
  const params = useParams();

  const { data: cardListData, isLoading } = useGoalNotes({
    goalId: params.goalid,
    page: 1,
    limit: 10,
  });

  return (
    <div className='flex flex-col flex-grow h-full'>
      <GoalTitleCard title={goalTitle} />
      <div className='flex-1 flex flex-col'>
        {!isLoading &&
        cardListData?.data &&
        cardListData.data.notes.length > 0 ? (
          <div className='flex-1 overflow-auto'>
            {cardListData.data.notes.map((note) => (
              <Card key={note.id} data={note} />
            ))}
          </div>
        ) : (
          <div className='flex-1 flex justify-center items-center'>
            <p className='text-sm text-slate-500'>아직 등록된 노트가 없어요</p>
          </div>
        )}
      </div>
    </div>
  );
};
