import { TodoRecently } from '@jeiltodo/icons';
import { GroupsInterface } from '../model/type';
import { GroupCard } from '../../../shared/ui/user/ui/group-card';

interface GroupBoardProps {
  groups: GroupsInterface[];
}

export const GroupBoard: React.FC<GroupBoardProps> = ({ groups }) => {
  const groupTotalCount = 10;
  return (
    <div className='bg-white w-[623px] p-6 rounded-xl'>
      <div className='flex items-center justify-start gap-2'>
        <TodoRecently className='w-10 h-10' />
        <h1 className='text-lg font-semibold'>소속 그룹 정보</h1>
        <div className='ml-[14px] py-[2px] px-1 bg-blue-50 text-slate-800 rounded-[4px] text-xs font-medium'>
          {groups.length}/
          <span className='text-blue-500'>{groupTotalCount}</span>
        </div>
      </div>
      <div className={`mt-4 h-[284px] flex flex-col items-center gap-4 overflow-y-scroll scrollbar-hide`}>
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            name={group.name}
            registerAt={group.registerAt}
          />
        ))}
      </div>
    </div>
  );
};
