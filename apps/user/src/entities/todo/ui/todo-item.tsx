'use client';

import { Checkbox } from '@jeiltodo/ui/shared';
import { Todo } from '..';

interface Props {
  todo: Todo;
  onCheck: (id: number) => void;
}

export const TodoContent = ({ todo, onCheck }: Props) => {
  const { id, title, isDone, noteId } = todo;

  return (
    <span className='inline-flex gap-2 items-center '>
      <Checkbox
        isChecked={isDone}
        onChange={() => {
          onCheck(id);
        }}
      />
      <label className={`text-sm text-slate-800 ${isDone && 'line-through'}`}>
        {title}
      </label>
    </span>
  );
};
