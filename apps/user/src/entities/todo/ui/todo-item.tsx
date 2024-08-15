'use client';

import { Checkbox } from '@jeiltodo/ui/shared';
import { Todo } from '..';

interface Props {
  todo: Todo;
  onCheck: (id: number) => void;
  disabled?: boolean;
}

export const TodoContent = ({ todo, onCheck, disabled }: Props) => {
  const { id, title, isDone, noteId } = todo;

  return (
    <span className='inline-flex gap-2 items-center '>
      <Checkbox
        disabled={disabled}
        isChecked={isDone}
        onChange={() => {
          onCheck(id);
        }}
      />
      <label className={`text-sm text-slate-800 ${isDone && 'line-through'}`}>
      <label className={`text-sm text-slate-800 ${isDone && 'line-through'}`}>
        {title}
      </label>
    </span>
  );
};
