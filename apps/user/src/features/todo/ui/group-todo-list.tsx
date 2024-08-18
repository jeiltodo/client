'use client';

import { useState } from 'react';
import {
  FormattedGoalWithTodos,
  TodoAssignee,
  TodoButtons,
  TodoModal,
} from '../../../entities/todo';
import { TodoContent } from '../../../entities/todo/ui/todo-item';
import { ConfirmationModal } from '../../../shared';
import { useCheckTodo } from '../../../entities/todo/hooks/useCheckTodo';
import { useDeleteTodo } from '../../../entities/todo/hooks/useDeleteTodo';
import { useGroupGoals } from '../../../entities/group/hooks/useGroupGoals';
import { useParams } from 'next/navigation';
import { useGroupDetail } from '../../../entities/group';

interface Props {
  goalWithTodos: FormattedGoalWithTodos;
}

export const GroupTodoList = ({ goalWithTodos: { goal, todos } }: Props) => {
  const params: { id: string } = useParams();
  const groupId = Number(params.id);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const { data: group } = useGroupDetail(groupId);
  const { data: groupGoals } = useGroupGoals(groupId);
  const goalsForTodoModal =
    groupGoals?.map((goal) => ({ id: goal.id, title: goal.title })) ?? [];

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
      {todos.map(({ id, title, isDone, memberInCharge }) => (
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
          {editModalOpen && (
            <TodoModal
              todoCreator={group?.title ?? '그룹'}
              setTodoModalToggle={setEditModalOpen}
              initialTodo={{ id, title, isDone }}
              initialGoal={goal}
              goals={goalsForTodoModal}
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
