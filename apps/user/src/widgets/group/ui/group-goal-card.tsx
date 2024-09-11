'use client';

import { Button } from '@jeiltodo/ui/shared';
import { ArrowRight, PlusOrange } from '@jeiltodo/icons';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { GroupGoalWithTodos } from '../../../entities/goal/types';
import { GroupProgressBar } from '../../../entities/group/ui';
import { GroupTodoList } from '../../../features/todo/ui/group-todo-list';
import { formatGroupTodos } from '../model/formatGroupTodos';
import { useGroupGoals } from '../../../entities/group/hooks/useGroupGoals';
import { TodoModal } from '../../../entities/todo/ui';
import { useGroupDetail } from '../../../entities/group/hooks';

export const GroupGoalCard = (goal: GroupGoalWithTodos) => {
  const params: { id: string } = useParams();
  const groupId = Number(params.id);
  const router = useRouter();
  const [isOpenAddTodoModal, setIsOpenAddTodoModal] = useState(false);

  const { data: groupGoals } = useGroupGoals(groupId);
  const { data: group } = useGroupDetail(groupId);
  const goalIdAndTitles =
    groupGoals?.map((item) => ({
      id: item.id,
      title: item.title,
    })) ?? [];

  const notDone = formatGroupTodos(goal, false);
  const done = formatGroupTodos(goal, true);

  const handleAddTodo = () => {
    setIsOpenAddTodoModal(true);
  };

  const handleMore = () => {
    router.push(`/goal/group/${groupId}/${goal.id}`);
  };

  return (
    <div className='w-full p-6 rounded-3xl bg-groupColor-50  '>
      <div className='flex justify-between'>
        <p className='text-lg font-bold text-slate-800'>{goal.title}</p>
        <Button
          variant='text-group-color'
          className='flex gap-1 items-center text-sm h-[20px]'
          onClick={handleAddTodo}
        >
          <PlusOrange width={16} height={16} />할 일 추가
        </Button>
      </div>
      <div className='w-full rounded-3xl py-[2px] px-2 bg-white mt-2'>
        <GroupProgressBar progress={goal.progress} />
      </div>
      <div className='w-full flex flex-wrap gap-6 desktop:!flex-nowrap mt-4 mb-5 pt-4'>
        {notDone.todos.length !== 0 ? (
          <div className='w-full min-h-[152px]'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>To do</p>
            <GroupTodoList goalWithTodos={notDone} />
          </div>
        ) : (
          <div className='w-full '>
            <p className='text-sm font-semibold text-slate-800 mb-3'>To do</p>
            <div className='flex items-center justify-center w-full min-h-[152px]'>
              <p className='text-sm font-normal text-slate-400'>
                아직 해야할 일이 없어요
              </p>
            </div>
          </div>
        )}
        {done.todos.length !== 0 ? (
          <div className='w-full min-h-[152px]'>
            <p className='text-sm font-semibold text-slate-800 mb-3'>Done</p>
            <GroupTodoList goalWithTodos={done} />
          </div>
        ) : (
          <div className='w-full '>
            <p className='text-sm font-semibold text-slate-800 mb-3'>Done</p>
            <div className='flex items-center justify-center w-full min-h-[152px]'>
              <p className='text-sm font-normal text-slate-400'>
                아직 다 한 일이 없어요
              </p>
            </div>
          </div>
        )}
      </div>
      <div className='w-full flex justify-center'>
        <Button
          variant='rounded-white'
          className='min-w-[120px] min-h-8 flex'
          onClick={handleMore}
        >
          <span className='pl-4 text-sm font-semibold text-slate-700'>
            더보기
          </span>
          <ArrowRight width={24} height={24} />
        </Button>
      </div>
      {isOpenAddTodoModal && (
        <TodoModal
          todoCreator={group?.title ?? '그룹'}
          goals={goalIdAndTitles}
          setTodoModalToggle={setIsOpenAddTodoModal}
          initialGoal={goal}
        />
      )}
    </div>
  );
};
