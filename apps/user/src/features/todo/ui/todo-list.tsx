'use client';

import { useState } from 'react';
import {
  Todo,
  TodoAsignee,
  TodoButtons,
  TodoModal,
} from '../../../entities/todo';
import { TodoContent } from '../../../entities/todo/ui/todo-item';
import { Goal } from '../../../entities/goal';
import { ConfirmationModal } from '../../../shared';

interface Props {
  todos: (Todo & { goal: Pick<Goal, 'id' | 'title'> })[];
  variant?: 'user' | 'group';
}

export const TodoList = ({ todos, variant = 'user' }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const handleClickEdit = () => {
    setEditModalOpen(true);
  };

  const handleClickRemove = () => {
    setRemoveModalOpen(true);
  };

  const handleClickNote = () => {};

  const handleCheck = () => {
    // todos.map(todo => ({...todo, done: !todo.done}))
    // group의 경우 asignee가 있는 경우에만 done처리
  };

  const handleRemove = () => {
    setRemoveModalOpen(false);
  };
  return (
    <ul className='w-full flex flex-wrap gap-2'>
      {todos.map(({ id, title, done, goal }) => (
        <li className='list-none w-full flex justify-between group '>
          <span className='inline-flex gap-4 items-center min-w-[280px]'>
            <TodoContent
              key={id}
              todo={{ id, title, done }}
              onCheck={handleCheck}
            />
            {variant === 'group' && <TodoAsignee />}
          </span>
          <TodoButtons
            onClickEdit={handleClickEdit}
            onClickRemove={handleClickRemove}
            onClickNote={handleClickNote}
          />
          {editModalOpen && (
            <TodoModal
              taskOwner={`${id}의 이름`}
              setTodoToggle={setEditModalOpen}
              initialTodo={{ id, title, done }}
              initialGoal={goal}
            />
          )}
          {removeModalOpen && (
            <ConfirmationModal
              setModalToggle={setRemoveModalOpen}
              onSubmit={handleRemove}
              submitButtonText='삭제'
            >
              정말 삭제하시겠습니까?
            </ConfirmationModal>
          )}
        </li>
      ))}
    </ul>
  );
};
