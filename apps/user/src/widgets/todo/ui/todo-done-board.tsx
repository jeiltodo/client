import { Button } from '@jeiltodo/ui/shared';
import { useState } from 'react';
import { Plus } from '@jeiltodo/icons';
import type { SingleGoalTodoResponse } from '../../../entities/todo';
import { TodoModal } from '../../../entities/todo';
import { TodoList } from '../../../features/todo';
import { SingleGoalResponse } from '../../../entities/goal';

export const TodoDoneBoard = ({
  todos,
  goal,
}: {
  todos: SingleGoalTodoResponse;
  goal: SingleGoalResponse;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const todosForList = todos.data.map((todo) => {
    return {
      id: todo.id,
      title: todo.title,
      isDone: todo.isDone,
      noteId: todo.noteId ?? undefined,
      goal: goal.data,
    };
  });

  const done = todosForList.filter((todo) => todo.isDone);
  const notDone = todosForList.filter((todo) => !todo.isDone);

  const handleAddModal = () => {
    setModalOpen(true);
  };

  return (
    <div className='desktop:grid-rows-2 tablet:grid-cols-2 tablet:gap-6 mobile:grid mobile:grid-cols-2 mobile:gap-4'>
      <div className='bg-white rounded-xl px-6 py-4'>
        {notDone.length !== 0 ? (
          <div className=''>
            <div className='flex items-start justify-between'>
              <p className='text-sm font-semibold text-slate-800 mb-3'>To do</p>
              <Button
                variant='text-blue'
                className='flex gap-1 items-center text-sm h-[20px]'
                onClick={handleAddModal}
              >
                <Plus width={16} height={16} />
                할일 추가
              </Button>
            </div>
            <TodoList todos={done} variant='user' />
          </div>
        ) : (
          <div className='min-h-[228px] flex flex-col'>
            <div className='flex items-start justify-between'>
              <p className='text-sm font-semibold text-slate-800 mb-3'>To do</p>
              <Button
                variant='text-blue'
                className='flex gap-1 items-center text-sm h-[20px]'
                onClick={handleAddModal}
              >
                <Plus width={16} height={16} />
                할일 추가
              </Button>
            </div>
            <div className='flex-grow flex items-center justify-center'>
              <p className='text-sm text-gray-500'>할 일 없음</p>
            </div>
          </div>
        )}
      </div>
      <div className='bg-slate-200 rounded-xl px-6 py-4'>
        {done.length !== 0 ? (
          <div className='w-full mt-6 tablet:pl-6 tablet:mt-0'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>Done</p>
            <TodoList todos={notDone} variant='user' />
          </div>
        ) : (
          <div className='min-h-[228px] flex flex-col'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>Done</p>
            <div className='flex-grow flex items-center justify-center'>
              <p className='text-sm text-gray-500'>할 일 없음</p>
            </div>
          </div>
        )}
      </div>
      {modalOpen && (
        <TodoModal setTodoToggle={setModalOpen} initialGoal={goal.data} />
      )}
    </div>
  );
};
