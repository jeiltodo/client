import { Flag } from '@jeiltodo/icons';

interface GoalTitleCardProps {
  title: string;
}

export const GoalTitleCard = ({ title }: GoalTitleCardProps) => {
  return (
    <div className='mb-[16px] bg-white rounded-[12px]'>
      <div className={`flex gap-2 items-center px-[24px] py-[14px]`}>
        <Flag width={24} height={24} color={'#1E293B'} />

        <span className='text-sm font-pretendard-semibold text-slate-800'>
          {title}
        </span>
      </div>
    </div>
  );
};
