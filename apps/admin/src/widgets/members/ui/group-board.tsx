import { TodoRecently } from '@jeiltodo/icons';
import { useParams } from 'next/navigation';
import type { GroupsInterface } from '../model/type';
import { GroupCard } from '../../../entities/member/ui/group-card';
import { useLeaveGroup } from '../../../entities/group/hooks/useLeaveGroup';

interface GroupBoardProps {
  groups: GroupsInterface[];
}

export const GroupBoard: React.FC<GroupBoardProps> = ({ groups }) => {
  const params = useParams();
  const GROUP_TOTAL_COUNT = 10;
  const { mutate: leaveGroup } = useLeaveGroup(Number(params.id));

  const handleLeaveGroup = (groupId: number) => {
    leaveGroup(groupId);
  };
  return (
    <div className='bg-white w-full p-6 rounded-xl'>
      <div className='flex items-center justify-start gap-2'>
        <TodoRecently className='w-10 h-10' />
        <h1 className='text-lg font-semibold'>소속 그룹 정보</h1>
        <div className='ml-[14px] py-[2px] px-1 bg-blue-50 text-slate-800 rounded-[4px] text-xs font-medium'>
          {groups.length} 그룹
          {/* <span className='text-blue-500'>{GROUP_TOTAL_COUNT}</span> */}
        </div>
      </div>
      <div
        className="mt-4 h-[284px] flex flex-col items-center gap-4 overflow-y-scroll scrollbar-hide"
      >
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            name={group.title}
            onLeaveGroup={() => { handleLeaveGroup(group.id); }}
            registerAt={group.registerAt}
          />
        ))}
      </div>
    </div>
  );
};
