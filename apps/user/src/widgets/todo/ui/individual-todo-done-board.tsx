import type { SingleGoalTodo } from '../../../entities/todo';
import type { Goal } from '../../../entities/goal';
import { TodoList } from '../../../features/todo';

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
      goal,
    };
  });

  const done = todosForList.filter((todo) => todo.isDone);
  const notDone = todosForList.filter((todo) => !todo.isDone);

  return (
    <div className='grid grid-cols-1 gap-y-4 tablet:grid-cols-1 tablet:gap-y-6 desktop:grid-cols-2 desktop:gap-x-4'>
      <div className='bg-white rounded-xl px-6 py-4'>
        {notDone.length !== 0 ? (
          <div className='w-full min-h-[228px] h-full flex flex-col'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>To do</p>
            <TodoList todos={notDone} />
          </div>
        ) : (
          <div className='w-full min-h-[228px] h-full flex flex-col'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>To do</p>

            <div className='flex-grow flex items-center justify-center'>
              <p className='text-sm text-slate-400'>아직 해야할 일이 없어요</p>
            </div>
          </div>
        )}
      </div>
      <div className='bg-slate-200 rounded-xl px-6 py-4'>
        {done.length !== 0 ? (
          <div className='w-full min-h-[228px] h-full flex flex-col'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>Done</p>
            <TodoList todos={done} />
          </div>
        ) : (
          <div className='w-full min-h-[228px] h-full flex flex-col'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>Done</p>
            <div className='flex-grow flex items-center justify-center'>
              <p className='text-sm text-slate-400'>아직 다 한 일이 없어요</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
