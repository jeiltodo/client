'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Todo } from '../../../entities/todo';
import { TodoButtons, TodoModal } from '../../../entities/todo';
import { TodoContent } from '../../../entities/todo/ui/todo-item';
import {
  individualGoalsOptions,
  userOptions,
  type Goal,
} from '../../../entities/goal';
import { ConfirmationModal } from '../../../shared';
import { useCheckTodo } from '../../../entities/todo/hooks/useCheckTodo';
import { useDeleteTodo } from '../../../entities/todo/hooks/useDeleteTodo';
import { NoteDetailSlide } from '../../../widgets/note';
import { useRouter } from 'next/navigation';

interface Props {
  todos: (Todo & { goal: Goal })[];
  isGroup?: boolean;
}

export const TodoList = ({ todos, isGroup = false }: Props) => {
  const router = useRouter();
  const [editModalId, setEditModalId] = useState<number | null>(null);
  const [noteSlideModalId, setNoteSlideModalId] = useState<number | null>(null);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [todoToRemove, setTodoToRemove] = useState<number | null>(null);
  const [noteCreateModalId, setNoteCreateModalId] = useState<number | null>(
    null
  );

  const { mutate: checkTodo } = useCheckTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { data: userInfo } = useQuery(userOptions());
  const { data: individualGoals } = useQuery(individualGoalsOptions());
  const goalsList = individualGoals?.map((item) => ({
    id: item.id,
    title: item.title,
  }));

  const handleClickEdit = (id: number) => {
    setEditModalId(id);
  };

  const handleClickRemove = (id: number) => {
    setTodoToRemove(id);
    setRemoveModalOpen(true);
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

  const handleClickNote = (todoId: number, noteId?: number) => {
    if (noteId) {
      setNoteSlideModalId(noteId);
    } else {
      setNoteCreateModalId(todoId);
    }
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
      {todos.map(({ id, title, isDone, goal, noteId }) => (
        <li
          key={id}
          className='list-none w-full h-6 flex justify-between group relative'
        >
          <span className='inline-flex gap-2 items-center min-w-[80%]'>
            <TodoContent
              key={id}
              todo={{ id, title, isDone }}
              onCheck={handleCheck}
              isGroup={isGroup}
            />
          </span>
          <TodoButtons
            onClickEdit={() => handleClickEdit(id)}
            onClickRemove={() => handleClickRemove(id)}
            onClickNote={() => handleClickNote(id, noteId)}
            isGroup={isGroup}
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
          {noteSlideModalId !== null && noteSlideModalId === noteId && (
            <NoteDetailSlide
              goalId={goal.id}
              goalTitle={goal.title}
              noteId={Number(noteId)}
              todoId={Number(id)}
              setToggle={() => setNoteSlideModalId(null)}
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
