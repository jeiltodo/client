import { Group } from '@jeiltodo/icons';
import { Button, ButtonGroup } from '@jeiltodo/ui';
import { GroupMemberList } from '../../entities/group';
import { Pagination } from '../../shared/ui/pagination';

export const GroupMembersBorad = () => {
  return (
    <div className='max-w-[652px] px-6 py-4 rounded-lg bg-blue-500'>
      {/* TODO: avartar background 404 */}
      <div className='w-full h-full bg-avatar-background'>
        <div className='flex justify-between items-center mb-6'>
          <div className='flex gap-4 items-center'>
            <div className='flex gap-2 items-center marker:'>
              <Group width={40} height={40} />
              <span>솔리드 그룹 구성원</span>
            </div>
            <div className='bg-white opacity-50 rounded-md w-fit h-fit px-1 py-[0.5]'>
              <span className='text-slate-800'>8</span>
              <span className='text-blue-500'>/10</span>
            </div>
          </div>

          <ButtonGroup>
            <Button variant='outline' className='bg-white py-2 px-[10px]'>
              그룹장 변경
            </Button>
            {/* <Button className='bg-slate-900 py-2 px-[10px]'>구성원 관리</Button> */}
            <button className='bg-slate-900 py-2 px-[10px] text-white rounded-xl'>
              구성원 관리
            </button>
          </ButtonGroup>
        </div>
        <GroupMemberList />
        <Pagination
          totalCount={10}
          limit={8}
          currentPage={1}
          variant='secondary'
          className='mt-10'
        />
      </div>
    </div>
  );
};
