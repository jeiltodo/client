import { BoardTitle, Flyout, ProgressBar } from '@jeiltodo/ui/shared';

import { useState } from 'react';
import { Kebab } from '@jeiltodo/icons';

import { Goal } from '../../entities/goal';

interface Props {
  goalData: Goal;
  onDeleteGoal: () => void;
  onEditGoal: () => void;
}

export const TitleProgressBarCard = ({
  goalData,
  onDeleteGoal,
  onEditGoal,
}: Props) => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

  const handleKebab = () => {
    setIsFlyoutOpen((prev) => !prev);
  };

  return (
    <div className='bg-white p-6 rounded-xl'>
      <div className='flex flex-row items-center justify-between mb-[24px]'>
        <BoardTitle icon='flag' title={goalData.title} />
        <span className='inline-flex items-center gap-2 relative'>
          <Kebab
            width={24}
            height={24}
            onClick={handleKebab}
            className='cursor-pointer '
          />
          {isFlyoutOpen && (
            <Flyout
              onEdit={() => {
                onEditGoal();
              }}
              onDelete={() => {
                onDeleteGoal();
              }}
            />
          )}
        </span>
      </div>
      <div className='flex flex-col justify-center w-full rounded-3xl  bg-white mt-2'>
        <h3 className='text-xs font-pretendard-semibold'>Progress</h3>
        <div className='py-[6px]'>
          <ProgressBar progress={goalData.progress || 0} />
        </div>
      </div>
    </div>
  );
};
