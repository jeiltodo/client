'use client';
import { Button, ButtonGroup } from '@jeiltodo/ui/shared';
import { useState } from 'react';
import { Goal } from '../../goal';
import { getUniqueNumbers } from '../../../shared';
import { statusMap } from '../../user/model/status-filter-map';
import { todoQuery } from '../hooks/todoQuery';

interface Props {
  goals: Pick<Goal, 'id' | 'title'>[];
  onClickFilter: (query: todoQuery) => void;
}

export const RecentFilter = ({ goals, onClickFilter }: Props) => {
  const goalIds = goals.map((goal) => goal.id);
  const [selectedGoals, setSelectedGoals] = useState<number[]>(goalIds);
  const [selectedStatus, setSelectedStatus] = useState<
    boolean | null | undefined
  >(null);

  const updateFilter = (
    goalIds: number[],
    status: boolean | null | undefined
  ) => {
    setSelectedGoals(goalIds);
    setSelectedStatus(status);
    onClickFilter({ goalIds, status });
  };

  const handleGoalClick = (id: number) => {
    const updated = getUniqueNumbers(selectedGoals, id);
    updateFilter(
      updated.length === 0 ? [] : updated,
      updated.length === 0
        ? undefined
        : selectedGoals.length === 0
          ? null
          : selectedStatus
    );
  };

  const handleSelectAllGoals = () => updateFilter(goalIds, null);
  const handleDeselectAllGoals = () => updateFilter([], undefined);
  const handleStatusClick = (label: string) =>
    updateFilter(selectedGoals, statusMap[label]);

  return (
    <>
      <div className='flex items-start justify-start gap-3 max-h-[132px] pb-3 border-b-[1px] border-slate-200'>
        <div className='min-w-[40px] text-sm font-medium pt-[2px]'>목표</div>
        <div className='w-full overflow-y-scroll scrollbar-hide max-h-[120px]'>
          <ButtonGroup gap={3}>
            {goals.map((goal) => (
              <Button
                key={goal.id}
                isSelectDuplicated={selectedGoals.includes(goal.id)}
                variant='outline-goal'
                className='px-3 text-sm font-medium h-[26px] leading-5'
                onClick={() => handleGoalClick(goal.id)}
              >
                {goal.title}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </div>
      <div className='flex items-center justify-start gap-3 py-3 border-b-[1px] border-slate-200'>
        <div className='min-w-[40px] text-sm font-medium'>상태</div>
        <ButtonGroup gap={3}>
          {Object.keys(statusMap).map((label) => (
            <Button
              key={label}
              isSelected={selectedStatus === statusMap[label]}
              variant='outline-status'
              className={`w-[80px] h-[28px] text-sm font-medium ${label === 'idle' && 'hidden'}`}
              onClick={() => handleStatusClick(label)}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className='flex items-center justify-end gap-3 py-3 border-b-[1px] border-slate-200'>
        <ButtonGroup gap={2}>
          <Button
            variant='outline-date'
            className='px-3 text-sm font-medium h-[28px]'
            onClick={handleSelectAllGoals}
          >
            전체 선택
          </Button>
          <Button
            variant='outline-date'
            className='px-3 text-sm font-medium h-[28px]'
            onClick={handleDeselectAllGoals}
          >
            전체 해제
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};
