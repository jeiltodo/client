'use client';

import { Checkbox } from '@jeiltodo/ui/shared';
import { Todo } from '..';

interface Props {
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
}: Props) => {
  const { id, title, isDone, noteId } = todo;
  console.log('todoContent isGroup: ', isGroup);

  return (
    <span className='inline-flex gap-2 items-center '>
      <Checkbox
        disabled={disabled}
        isChecked={isDone}
        onChange={() => {
          onCheck(id);
        }}
        isGroup={isGroup}
      />
      <label className={`text-sm text-slate-800 ${isDone && 'line-through'}`}>
        {title}
      </label>
    </span>
  );
};
