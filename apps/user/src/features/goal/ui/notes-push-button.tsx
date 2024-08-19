'use client';

import { ArrowRight, Note } from '@jeiltodo/icons';
import type { Goal } from '@jeiltodo/ui/shared';
import { useRouter } from 'next/navigation';

export const NotesPushButton = ({ goalData }: { goalData: Goal }) => {
  const router = useRouter();
  return (
    <div
      className='flex justify-between px-6 py-4 rounded-lg bg-blue-100 hover:transform group cursor-pointer'
      onClick={() => {
        router.push(`/note/list/${goalData.id}?title=${goalData.title}`);
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
