'use client';
import { FlyoutMenu } from '@jeiltodo/ui/shared';
import React, { useState } from 'react';

export default function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onEdit = () => {
    console.log('수정하기');
    //수정 로직
    //할일은 todoId를 넣어서 todo-modal toggle
    //노트는 goalId, todoId, noteId를 넣은 url로 이동
  };
  const onDelete = () => {
    console.log('삭제하기');
    //필요한 Id넣어서 삭제API로직
  };
  return (
    <main className='p-4 '>
      <FlyoutMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </main>
  );
}
