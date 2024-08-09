'use client';
import { Button, ButtonGroup } from '@jeiltodo/ui/shared';
import { useState, useEffect } from 'react';

interface Goal {
  id: number;
  title: string;
  memberId: number;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  individualGoals: Goal[];
  goalIds: number[];
  setGoalIds: React.Dispatch<React.SetStateAction<number[]>>;
  setStatus: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const RecentFilter: React.FC<Props> = ({
  individualGoals,
  goalIds,
  setGoalIds,
  setStatus,
}) => {
  const [activeBtn, setActiveBtn] = useState<string>('');
  const [initialGoal, setInitialGoal] = useState<boolean>(false);
  const [initialRender, setInitialRender] = useState<boolean>(true);

  const statusMap: Record<string, boolean | null> = {
    All: null,
    'To do': false,
    Done: true,
  };

  useEffect(() => {
    // 렌더링 시 모든 목표가 선택되고 상태는 "All"로 설정
    if (initialRender === true) {
      const allGoalIds = individualGoals.map((goal) => goal.id);
      setGoalIds(allGoalIds);
      setStatus(null);
      setActiveBtn('All');
      setInitialRender(false);
    }
  }, []);

  useEffect(() => {
    if (goalIds.length === 0 && initialRender === false) {
      setInitialGoal(true);
      setStatus(null);
      setActiveBtn('');
    } else if (goalIds.length === 1 && initialGoal == true) {
      setInitialGoal(false);
      setStatus(null);
      setActiveBtn('All');
    }
  }, [goalIds]);

  const handleGoalClick = (id: number) => {
    const updatedIds = goalIds.includes(id)
      ? goalIds.filter((selectedId) => selectedId !== id)
      : [...goalIds, id];

    setGoalIds(updatedIds);
  };

  const handleStatusClick = (label: string) => {
    setActiveBtn(label);
    setStatus(statusMap[label]);
  };

  const handleSelectAllGoals = () => {
    const allGoalIds = individualGoals.map((goal) => goal.id);
    setGoalIds(allGoalIds);
    setActiveBtn('All');
    setStatus(null);
  };

  const handleDeselectAllGoals = () => {
    setGoalIds([]);
    setActiveBtn('');
    setStatus(null);
  };

  return (
    <>
      <div className='flex items-start justify-start gap-3 h-[132px] py-3 border-b-[1px] border-slate-200'>
        <div className='min-w-[40px] text-sm font-medium'>목표</div>
        <div className='w-full overflow-y-scroll scrollbar-hide h-full'>
          <ButtonGroup gap={3}>
            {individualGoals.map((goal) => (
              <Button
                key={goal.id}
                isSelectDuplicated={goalIds.includes(goal.id)}
                variant='outline-goal'
                className='py-1 px-3 text-sm font-medium h-[26px] leading-5'
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
          {['All', 'To do', 'Done'].map((label) => (
            <Button
              key={label}
              isSelected={activeBtn === label}
              variant='outline-status'
              className='w-[80px] h-[28px] text-sm font-medium'
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
            className='py-1 px-3 text-sm font-medium'
            onClick={handleSelectAllGoals}
          >
            전체 선택
          </Button>
          <Button
            variant='outline-date'
            className='py-1 px-3 text-sm font-medium'
            onClick={handleDeselectAllGoals}
          >
            전체 해제
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};
