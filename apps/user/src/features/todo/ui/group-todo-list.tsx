'use client';

import { useState } from 'react';
import {
  Todo,
  TodoAssignee,
  TodoButtons,
  TodoModal,
} from '../../../entities/todo';
import { TodoContent } from '../../../entities/todo/ui/todo-item';
import { GoalIdAndTitle } from '../../../entities/goal';
import { ConfirmationModal } from '../../../shared';
import { useCheckTodo } from '../../../entities/todo/hooks/useCheckTodo';
import { useDeleteTodo } from '../../../entities/todo/hooks/useDeleteTodo';

interface Props {
  todos: (Todo & {
    goal: GoalIdAndTitle;
    memberInCharge: { nickname: string; color: string } | null;
  })[];
}

export const GroupTodoList = ({ todos }: Props) => {
  // const useParams
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const { mutate: checkTodo } = useCheckTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleClickEdit = () => {
    setEditModalOpen(true);
  };

  const handleClickRemove = () => {
    setRemoveModalOpen(true);
  };

  const handleClickNote = () => {};

  const handleCheck = (todoId: number) => {
    checkTodo(todoId);
  };

  const handleRemove = (id: number) => {
    deleteTodo(id);
    setRemoveModalOpen(false);
  };
  return (
    <ul className='w-full flex flex-wrap gap-2'>
      {todos.map(({ id, title, isDone, goal, memberInCharge }) => (
        <li key={id} className='list-none w-full flex justify-between group '>
          <span className='inline-flex gap-4 items-center min-w-[280px]'>
            <TodoContent
              key={id}
              todo={{ id, title, isDone }}
              disabled={memberInCharge === null}
              onCheck={handleCheck}
            />
            <TodoAssignee asignee={memberInCharge} todoId={id} />
          </span>
          <TodoButtons
            onClickEdit={handleClickEdit}
            onClickRemove={handleClickRemove}
            onClickNote={handleClickNote}
          />
          {/* {editModalOpen && (
            <TodoModal
              setTodoToggle={setEditModalOpen}
              initialTodo={{ id, title, isDone }}
              initialGoal={goal}
            />
          )} */}
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
