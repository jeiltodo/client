'use client';

import { LayoutTitle, NoteDetailSlide } from '@jeiltodo/ui/shared';
import { CardListBoard } from '../../widgets/note/ui/card-list-board';
import { useState } from 'react';

export const ListPage = () => {
  const [isSlideOpen, setIsSlideOpen] = useState<boolean>(false);

  const handleSlideOpen = (id: number) => {
    if (id) {
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
