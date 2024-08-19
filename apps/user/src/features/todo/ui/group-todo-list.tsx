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
import { useParams, useRouter } from 'next/navigation';
import { useGroupDetail } from '../../../entities/group';
import { NoteDetailSlide } from '../../../widgets/note';

interface Props {
  goalWithTodos: FormattedGoalWithTodos;
}

export const GroupTodoList = ({ goalWithTodos: { goal, todos } }: Props) => {
  console.log('goal: ', goal);
  const params: { id: string } = useParams();
  const groupId = Number(params.id);
  const router = useRouter();

  const [editModalId, setEditModalId] = useState<number | null>(null);
  const [noteSlideModalId, setNoteSlideModalId] = useState<number | null>(null);
  const [noteCreateModalId, setNoteCreateModalId] = useState<number | null>(
    null
  );
  const [todoToRemove, setTodoToRemove] = useState<number | null>(null);

  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const { data: group } = useGroupDetail(groupId);
  const { data: groupGoals } = useGroupGoals(groupId);
  const goalsForTodoModal =
    groupGoals?.map((goal) => ({ id: goal.id, title: goal.title })) ?? [];

  const { mutate: checkTodo } = useCheckTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleClickEdit = (id: number) => {
    setEditModalId(id);
  };
  const handleClickRemove = (id: number) => {
    setTodoToRemove(id);
    setRemoveModalOpen(true);
  };
  const handleClickNote = (todoId: number, noteId?: number) => {
    if (noteId) {
      setNoteSlideModalId(noteId);
    } else {
      setNoteCreateModalId(todoId);
    }
  };

  const handleCreate = (
    goalId: number,
    goalTitle: string,
    todoId: number,
    todoTitle: string
  ) => {
    const url = `/note/${goalId}/${todoId}/new?title=${goalTitle}&todo=${todoTitle}`;
    router.push(url);
  };

  const handleCheck = (todoId: number) => {
    checkTodo(todoId);
  };

  const handleRemove = (id: number) => {
    deleteTodo(id);
    setRemoveModalOpen(false);
    setTodoToRemove(null);
  };

  return (
    <ul className='w-full flex flex-wrap gap-2'>
      {todos.map(({ id, title, isDone, memberInCharge, noteId }) => (
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
            onClickEdit={() => handleClickEdit(id)}
            onClickRemove={() => handleClickRemove(id)}
            onClickNote={() => handleClickNote(id, noteId)}
          />
          {editModalId === id && (
            <TodoModal
              todoCreator={group?.title ?? '그룹'}
              setTodoModalToggle={() => setEditModalId(null)}
              initialTodo={{ id, title, isDone }}
              initialGoal={goal}
              goals={goalsForTodoModal}
            />
          )}
          {noteSlideModalId !== null && noteSlideModalId === noteId && (
            <NoteDetailSlide
              goalTitle={goal.title}
              goalId={goal.id}
              noteId={Number(noteId)}
              todoId={Number(id)}
              setToggle={() => setNoteSlideModalId(null)}
            />
          )}
          {removeModalOpen && todoToRemove === id && (
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
          {noteCreateModalId !== null && noteCreateModalId === id && (
            <ConfirmationModal
              setModalToggle={() => setNoteCreateModalId(null)}
              onSubmit={() => handleCreate(goal.id, goal.title, id, title)}
              submitButtonText='확인'
            >
              노트를 작성하시겠습니까?
            </ConfirmationModal>
          )}
        </li>
      ))}
    </ul>
  );
};
