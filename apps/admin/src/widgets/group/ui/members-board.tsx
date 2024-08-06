import { Group } from '@jeiltodo/icons';
import { Pagination } from '../../../shared/ui/pagination';
import { MembersManageButtons } from '../../../features/group/ui/members-manage-buttons';
import { MembersBoardProvider } from '@jeiltodo/ui/shared';
import { changeLeader } from '../../../features/group/api/changeLeader';
import { removeMember } from '../../../features/group/api/removeMember';
import { MemberList } from '../../../features/group/ui/member-list';

export const MembersBorad = () => {
  return (
    <MembersBoardProvider>
      <div className='max-w-[652px] px-6 py-4 rounded-lg bg-blue-500'>
        <div className='w-full h-full bg-avatar-background'>
          <div className='flex justify-between items-center mb-6'>
            <div className='flex gap-4 items-center'>
              <div className='flex gap-2 items-center'>
                <Group width={40} height={40} />
                <span>group name 구성원</span>
              </div>
              <div className='bg-white opacity-50 rounded-md w-fit h-fit px-1 py-[0.5]'>
                <span className='text-slate-800'>n</span>
                <span className='text-blue-500'>/10</span>
              </div>
            </div>

            <MembersManageButtons />
          </div>
          <MemberList
            onChangeLeader={changeLeader}
            onRemoveMember={removeMember}
          />
          <Pagination
            totalCount={10}
            limit={8}
            currentPage={1}
            variant='secondary'
            className='mt-10'
          />
        </div>
      </div>
    </MembersBoardProvider>
  );
};
