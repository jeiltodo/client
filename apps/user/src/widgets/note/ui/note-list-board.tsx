'use client';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import { LoadingSpinner } from '@jeiltodo/ui/shared';
import { Card, GoalTitleCard } from '../../../features/note';
import { useGoalNotes } from '../../../entities/note/hooks';

export const NoteListBoard = () => {
  const params: { goalId: string } = useParams();
  const goalId = Number(params.goalId);

  const searchParams = useSearchParams();
  const goalTitle = searchParams.get('title');
  const { data: noteList, isLoading } = useGoalNotes({
    goalId,
    limit: 10,
  });

  return (
    <div className='flex flex-col flex-grow h-full'>
      <div className='flex-1 flex flex-col relative'>
        <GoalTitleCard title={goalTitle} />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {noteList?.pages.map((item, i) => (
              <React.Fragment key={i}>
                {item.data.notes.length !== 0 ? (
                  item.data.notes.map((note) => (
                    <div key={note.id} className='overflow-auto'>
                      <Card
                        noteData={note}
                        key={note.id}
                        goal={{ id: goalId, title: goalTitle ?? '목표' }}
                      />
                    </div>
                  ))
                ) : (
                  <div className='flex-1 flex justify-center items-center'>
                    <p className='text-sm text-slate-500'>
                      아직 등록된 노트가 없어요
                    </p>
                  </div>
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
