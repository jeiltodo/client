'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { TodoAsignee, TodoButtons, TodoModal } from '../../../entities/todo';
import type { Todo } from '../../../entities/todo';
import { TodoContent } from '../../../entities/todo/ui/todo-item';
import type { Goal } from '../../../entities/goal';
import { ConfirmationModal } from '../../../shared';
import { useCheckTodo } from '../../../entities/todo/hooks/useCheckTodo';
import { useDeleteTodo } from '../../../entities/todo/hooks/useDeleteTodo';
import { goalQueryKeys } from '../../../entities/goal/hooks/queryKey';

interface Props {
  todos: (Todo & { goal?: Goal })[];
  variant?: 'user' | 'group';
}

export const TodoList = ({ todos, variant = 'user' }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const { mutate: checkTodo } = useCheckTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const params = useParams();
  const goalId = Number(params.goalid);

  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries({
          queryKey: goalQueryKeys.individual.todos(),
        });
        queryClient.invalidateQueries({
          queryKey: goalQueryKeys.individual.lists(),
        });
        queryClient.invalidateQueries({
          queryKey: goalQueryKeys.individual.single(goalId),
        });
        queryClient.invalidateQueries({
          queryKey: goalQueryKeys.individual.progress(),
        });
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes('todos'),
        });
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes('todos'),
        });
      },
    });
  };

  const handleRemove = (id: number) => {
    deleteTodo(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: goalQueryKeys.individual.todos(),
        });
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes('todos'),
        });
        queryClient.invalidateQueries({
          queryKey: goalQueryKeys.individual.lists(),
        });
        queryClient.invalidateQueries({
          queryKey: goalQueryKeys.individual.single(goalId),
        });
      },
    });
    setRemoveModalOpen(false);
  };

  return (
    <ul className='w-full flex flex-wrap gap-2'>
      {todos.map(({ id, title, isDone, goal }) => (
        <li
          key={id}
          className='list-none w-full h-6 flex justify-between group '
        >
          <span className='inline-flex gap-2 items-center min-w-[80%]'>
            <TodoContent
              key={id}
              todo={{ id, title, isDone }}
              onCheck={() => {
                handleCheck(id);
              }}
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
