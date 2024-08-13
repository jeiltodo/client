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
import { useQueryClient } from '@tanstack/react-query';
import { useCheckTodo } from '../../../entities/todo/hooks/useCheckTodo';
import { goalQueryKeys } from '../../../entities/goal/hooks/queryKey';
import { useDeleteTodo } from '../../../entities/todo/hooks/useDeleteTodo';

interface Props {
  todos: (Todo & { goal: Goal })[];
  variant?: 'user' | 'group';
}

export const TodoList = ({ todos, variant = 'user' }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const { mutate: checkTodo } = useCheckTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const queryClinet = useQueryClient();

  const handleClickEdit = () => {
    setEditModalOpen(true);
  };

  const handleClickRemove = () => {
    setRemoveModalOpen(true);
  };

  const handleClickNote = () => {};

  const handleCheck = (todoId: number) => {
    checkTodo(todoId, {
      onSuccess: () => {
        queryClinet.invalidateQueries({
          queryKey: goalQueryKeys.individual.todos(),
        });
        queryClinet.invalidateQueries({
          queryKey: goalQueryKeys.individual.progress(),
        });
      },
    });
  };

  const handleRemove = (id: number) => {
    deleteTodo(id, {
      onSuccess: () => {
        queryClinet.invalidateQueries({
          queryKey: goalQueryKeys.individual.todos(),
        });
      },
    });
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
              onSubmit={() => {
                setEditModalOpen(false);
              }}
            />
          )}
          {removeModalOpen && (
            <ConfirmationModal
              setModalToggle={setRemoveModalOpen}
              onSubmit={() => {
                handleRemove(id);
              }}
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
