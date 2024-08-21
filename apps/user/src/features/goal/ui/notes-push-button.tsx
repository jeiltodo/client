'use client';

import { ArrowRight, GroupNote, Note } from '@jeiltodo/icons';
import type { Goal } from '@jeiltodo/ui/shared';
import { useRouter } from 'next/navigation';

export const NotesPushButton = ({
  goalData,
  isGroup = false,
}: {
  goalData: Goal;
  isGroup?: boolean;
}) => {
  const router = useRouter();
  return (
    <button
      type='button'
      className={`flex justify-between px-6 py-4 rounded-lg ${isGroup ? 'bg-groupColor-200' : 'bg-blue-100'} hover:transform group cursor-pointer`}
      onClick={() => {
        router.push(`/note/list/${goalData.id}?title=${goalData.title}`);
      }}
    >
      <div className='flex gap-x-2 items-center justify-between'>
        {isGroup ? (
          <GroupNote width={24} height={24} />
        ) : (
          <Note width={24} height={24} />
        )}
        <p className='font-semibold'>노트 모아보기</p>
      </div>
      <ArrowRight
        width={24}
        height={24}
        className='group-hover:transform group-hover:translate-x-1 transition-transform duration-500'
      />
    </button>
  );
};
