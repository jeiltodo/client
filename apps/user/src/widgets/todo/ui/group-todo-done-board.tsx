import type { SingleGroupGoalTodo } from '../../../entities/todo';
import { TodoList } from '../../../features/todo';
import type { Goal } from '../../../entities/goal';

export const GroupTodoDoneBoard = ({
  todos,
  goal,
  userName,
}: {
  todos: SingleGroupGoalTodo[];
  goal: Goal;
  userName: string;
}) => {
  const userTodosForList = todos
    .filter(
      (todo) =>
        todo.memberInCharge !== null &&
        todo.memberInCharge.nickname === userName
    )
    .filter((todo) => todo.isDone === false);

  const userDoneForList = todos
    .filter(
      (todo) =>
        todo.memberInCharge !== null &&
        todo.memberInCharge.nickname === userName
    )
    .filter((todo) => todo.isDone === true);

  const userNotDone = userTodosForList.map((todo) => {
    return {
      id: todo.id,
      title: todo.title,
      isDone: todo.isDone,
      noteId: todo.noteId ?? undefined,
      goal: goal,
    };
  });

  const userDone = userDoneForList.map((todo) => {
    return {
      id: todo.id,
      title: todo.title,
      isDone: todo.isDone,
      noteId: todo.noteId ?? undefined,
      goal: goal,
    };
  });

  return (
    <div className='grid grid-cols-1 gap-y-4 tablet:grid-cols-1 tablet:gap-y-6 desktop:grid-cols-2 desktop:gap-x-4'>
      <div className='bg-white rounded-xl px-6 py-4 '>
        {userNotDone.length !== 0 ? (
          <div className='w-full min-h-[228px] mt-2 '>
            <p className='text-sm font-semibold text-slate-800 mb-3'>
              {userName}의 To do
            </p>
            <TodoList todos={userNotDone} isGroup={true} />
          </div>
        ) : (
          <div className='min-h-[96px] desktop:min-h-[228px] flex flex-col'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>
              {userName}의 To do
            </p>
            <div className='flex-grow flex items-center justify-center'>
              <p className='text-sm text-slate-400'>아직 해야할 일이 없어요</p>
            </div>
          </div>
        )}
      </div>
      <div className='bg-groupColor-100 rounded-xl px-6 py-4'>
        {userDone.length !== 0 ? (
          <div className='w-full mt-2'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>
              {userName}의 Done
            </p>
            <TodoList todos={userDone} isGroup={true} />
          </div>
        ) : (
          <div className='min-h-[96px] desktop:min-h-[228px] flex flex-col'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>
              {userName}의 Done
            </p>
            <div className='flex-grow flex items-center justify-center'>
              <p className='text-sm text-slate-400'>아직 다 한 일이 없어요</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
