'use client';

import { useState } from 'react';
import { Todo, TodoButtons, TodoModal } from '../../../entities/todo';
import { TodoContent } from '../../../entities/todo/ui/todo-item';
import { Goal } from '../../../entities/goal';

interface Props {
  todos: (Todo & { goal: Pick<Goal, 'id' | 'title'> })[];
}

export const TodoList = ({ todos }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClickEdit = () => {
    setModalOpen(true);
  };

  const handleClickNote = () => {};

  const handleCheck = () => {};
  return (
    <div>
      <ul className='w-full flex flex-wrap gap-2'>
        {todos.map(({ id, title, done, goal }) => (
          <li className='list-none w-full flex justify-between group'>
            <TodoContent
              key={id}
              todo={{ id, title, done }}
              onCheck={handleCheck}
            />
            <TodoButtons
              onClickEdit={handleClickEdit}
              onClickNote={handleClickNote}
            />
            {modalOpen && (
              <TodoModal
                taskOwner={`${id}의 이름`}
                setTodoToggle={setModalOpen}
                initialTodo={{ id, title, done }}
                initialGoal={goal}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
