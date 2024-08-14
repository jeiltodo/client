'use client';

import { useState } from 'react';
import {
  Todo,
  TodoAsignee,
  TodoButtons,
  TodoModal,
  todoQueryKeys,
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
        queryClinet.invalidateQueries({
          predicate: (query) =>
            query.queryKey.includes('todos')
        })
      },
    });
  };

  const handleRemove = (id: number) => {
    deleteTodo(id, {
      onSuccess: () => {
        queryClinet.invalidateQueries({
          queryKey: goalQueryKeys.individual.todos(),
        });
        queryClinet.invalidateQueries({
          predicate: (query) =>
            query.queryKey.includes('todos')
        })
      },
    });
    setRemoveModalOpen(false);
  };
  return (
    <ul className='w-full flex flex-wrap gap-2'>
      {todos?.map(({ id, title, isDone, goal }) => (
        <li key={id} className='list-none w-full h-6 flex justify-between group '>
          <span className='inline-flex gap-2 items-center min-w-[80%]'>
            <TodoContent
              key={id}
              todo={{ id, title, isDone }}
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
              setTodoToggle={setEditModalOpen}
              initialTodo={{ id, title, isDone }}
              initialGoal={goal}
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
