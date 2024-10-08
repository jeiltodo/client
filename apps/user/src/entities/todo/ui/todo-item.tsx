'use client';

import { Checkbox } from '@jeiltodo/ui/shared';
import type { Todo } from '../model';

interface TodoContentProps {
  todo: Todo;
  onCheck: (id: number) => void;
  disabled?: boolean;
  isGroup?: boolean;
}

export const TodoContent = ({
  todo,
  onCheck,
  disabled,
  isGroup = false,
}: TodoContentProps) => {
  const { id, title, isDone } = todo;

  return (
    <span className='inline-flex gap-2 items-center '>
      <Checkbox
        isGroup={isGroup}
        disabled={disabled}
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
