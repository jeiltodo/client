import { Button } from '@jeiltodo/ui/shared';
import { useEffect, useState } from 'react';
import { todoApi, SingleGoalTodo, TodoModal } from '../../../entities/todo';
import { TodoList } from '../../../features/todo';
import { Plus } from '@jeiltodo/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { individualGoalsOptions } from '../../../entities/goal';
import { goalQueryKeys } from '../../../entities/goal/hooks/queryKey';

export const TodoDoneBoard = ({ goalId }: { goalId: number }) => {
  const [todos, setTodos] = useState<SingleGoalTodo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: individualGoalsData } = useQuery(individualGoalsOptions());
  const initialGoal =
    individualGoalsData &&
    individualGoalsData.data.individualGoals.find((goal) => goal.id === goalId);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await todoApi.getSingleGoalTodo(goalId);
        console.log('response: ', response);
        setTodos(response.data);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };

    fetchTodos();
  }, [goalId]);

  const done = todos
    .filter((todo) => todo.is_done === true)
    .map((todo) => ({
      ...todo,
      done: todo.is_done,
    }));

  const notDone = todos
    .filter((todo) => todo.is_done === false)
    .map((todo) => ({
      ...todo,
      done: todo.is_done,
    }));

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
            <TodoList
              todos={notDone}
              variant='user'
              onCheckSuccess={() => {
                queryClient.invalidateQueries({
                  queryKey: goalQueryKeys.individual.single(),
                });
                queryClient.invalidateQueries({
                  queryKey: goalQueryKeys.individual.progress(),
                });
              }}
              onDeleteSuccess={() => {
                queryClient.invalidateQueries({
                  queryKey: goalQueryKeys.individual.single(),
                });
              }}
            />
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
            <TodoList
              todos={done}
              variant='user'
              onCheckSuccess={() => {
                queryClient.invalidateQueries({
                  queryKey: goalQueryKeys.individual.single(),
                });
                queryClient.invalidateQueries({
                  queryKey: goalQueryKeys.individual.progress(),
                });
              }}
              onDeleteSuccess={() => {
                queryClient.invalidateQueries({
                  queryKey: goalQueryKeys.individual.single(),
                });
              }}
            />
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
      {modalOpen && individualGoalsData && (
        <TodoModal setTodoToggle={setModalOpen} initialGoal={initialGoal} />
      )}
    </div>
  );
};
