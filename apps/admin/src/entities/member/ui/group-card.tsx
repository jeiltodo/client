import { Button, formatDateString } from '@jeiltodo/ui/shared';

interface GroupCardProps {
  name: string;
  registerAt: string;
  onLeaveGroup: () => void;
}

export const GroupCard = ({
  name,
  registerAt,
  onLeaveGroup,
}: GroupCardProps) => {
  return (
    <div className='w-full bg-blue-50 flex items-end justify-between p-6 rounded-xl'>
      <div className='flex items-center justify-start gap-2'>
        <div className='w-[172px]'>
          <p className='font-pretendard-semibold text-sm text-gray-400'>
            그룹 이름
          </p>
          <div className='text-lg font-semibold text-slate-800'>{name}</div>
        </div>
        <div className='w-[172px]'>
          <p className='font-pretendard-semibold text-sm text-gray-400'>
            가입 일자
          </p>
          <div className='text-lg font-semibold text-slate-800'>
            {formatDateString(registerAt)}
          </div>
        </div>
      </div>
      <Button
        variant='outline'
        className='w-[84px] h-[36px]'
        onClick={onLeaveGroup}
      >
        탈퇴
      </Button>
    </div>
  );
};
