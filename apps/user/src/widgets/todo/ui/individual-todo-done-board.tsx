import type { SingleGoalTodo } from '../../../entities/todo';
import { Goal } from '../../../entities/goal';
import { IndividualTodoList } from '../../../features/todo';

export const IndividualTodoDoneBoard = ({
  todos,
  goal,
}: {
  todos: SingleGoalTodo[];
  goal: Goal;
}) => {
  const todosForList = todos.map((todo) => {
    return {
      id: todo.id,
      title: todo.title,
      isDone: todo.isDone,
      noteId: todo.noteId ?? undefined,
      goal: goal,
    };
  });

  const done = todosForList.filter((todo) => todo.isDone);
  const notDone = todosForList.filter((todo) => !todo.isDone);

  return (
    <div className='grid grid-cols-1 gap-y-4 tablet:grid-cols-1 tablet:gap-y-6 desktop:grid-cols-2 desktop:gap-x-4'>
      <div className='bg-white rounded-xl px-6 py-4'>
        {notDone.length !== 0 ? (
          <div className=''>
            <div className='flex items-start justify-between'>
              <p className='text-sm font-semibold text-slate-800 mb-3'>To do</p>
            </div>
            <IndividualTodoList todos={notDone} />
          </div>
        ) : (
          <div className='min-h-[228px] flex flex-col'>
            <div className='flex items-start justify-between'>
              <p className='text-sm font-semibold text-slate-800 mb-3'>To do</p>
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
            <IndividualTodoList todos={done} />
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
    </div>
  );
};
