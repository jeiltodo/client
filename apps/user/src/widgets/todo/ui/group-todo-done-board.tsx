import type { SingleGroupGoalTodo } from '../../../entities/todo';
import { TodoList } from '../../../features/todo';
import { Goal } from '../../../entities/goal';

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
    <div className='desktop:grid-rows-1 tablet:grid-cols-2 tablet:gap-6 mobile:grid mobile:grid-cols-2 mobile:gap-4'>
      <div className='bg-white rounded-xl px-6 py-4'>
        {userNotDone.length !== 0 ? (
          <div className='w-full min-h-[228px]   mt-6 tablet:pl-6 tablet:mt-0'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>
              {userName}의 To do
            </p>
            <TodoList todos={userNotDone} isGroup={true} />
          </div>
        ) : (
          <div className='min-h-[228px] flex flex-col'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>
              {userName}의 To do
            </p>
            <div className='flex-grow flex items-center justify-center'>
              <p className='text-sm text-gray-500'>할 일 없음</p>
            </div>
          </div>
        )}
      </div>
      <div className='bg-slate-200 min-h-[228px]  rounded-xl px-6 py-4'>
        {userDone.length !== 0 ? (
          <div className='w-full mt-6 tablet:pl-6 tablet:mt-0'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>
              {userName}의 Done
            </p>
            <TodoList todos={userDone} isGroup={true} />
          </div>
        ) : (
          <div className='min-h-[228px] flex flex-col'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>
              {userName}의 Done
            </p>
            <div className='flex-grow flex items-center justify-center'>
              <p className='text-sm text-gray-500'>할 일 없음</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
