'use client';

import { useState } from 'react';
import { Todo, TodoButtons, TodoModal } from '../../../entities/todo';
import { TodoContent } from '../../../entities/todo/ui/todo-item';
import {
  individualGoalsOptions,
  userOptions,
  type Goal,
} from '../../../entities/goal';
import { ConfirmationModal } from '../../../shared';
import { useCheckTodo } from '../../../entities/todo/hooks/useCheckTodo';
import { useDeleteTodo } from '../../../entities/todo/hooks/useDeleteTodo';

import { useQuery, useQueryClient } from '@tanstack/react-query';

interface Props {
  todos: (Todo & { goal?: Goal })[];
}

export const IndividualTodoList = ({ todos }: Props) => {
  const [editModalId, setEditModalId] = useState<number | null>(null);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [todoToRemove, setTodoToRemove] = useState<number | null>(null);

  const { mutate: checkTodo } = useCheckTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { data: userInfo } = useQuery(userOptions());
  const { data: individualGoals } = useQuery(individualGoalsOptions());
  const goalsList = individualGoals?.map((item) => ({
    id: item.id,
    title: item.title,
  }));

  const queryClient = useQueryClient();

  const handleClickEdit = (id: number) => {
    setEditModalId(id);
  };

  const handleClickRemove = (id: number) => {
    setTodoToRemove(id);
    setRemoveModalOpen(true);
  };

  const handleClickNote = () => {};

  const handleCheck = (todoId: number) => {
    checkTodo(todoId, {
      onSuccess: () => {
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
          predicate: (query) => query.queryKey.includes('todos'),
        });
      },
    });
    setRemoveModalOpen(false);
    setTodoToRemove(null);
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
              onCheck={handleCheck}
            />
          </span>
          <TodoButtons
            onClickEdit={() => handleClickEdit(id)}
            onClickRemove={() => handleClickRemove(id)}
            onClickNote={handleClickNote}
          />
          {editModalId === id && (
            <TodoModal
              todoCreator={userInfo?.nickname || ''}
              setTodoModalToggle={() => setEditModalId(null)}
              goals={goalsList || []}
              initialTodo={{ id, title, isDone }}
              initialGoal={goal}
            />
          )}
          {removeModalOpen && todoToRemove === id && (
            <ConfirmationModal
              setModalToggle={setRemoveModalOpen}
              onSubmit={() => handleRemove(id)}
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
