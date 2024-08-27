'use client';
import { useParams } from 'next/navigation';
import { Pagination, useTableContext } from '../../../shared';
import { BoardTitle, LoadingSpinner } from '@jeiltodo/ui/shared';
import { MemberGoalTable } from '../../../widgets/members/ui/member-goal-table';
import { TableToolBar } from '../../../shared/ui/@x/table-toolbar/table-toobar';
import { useGetMemberDetail } from '../../../entities/member/hooks/useGetMemberDetaili';
import { GroupBoard } from '../../../widgets/members';
import { MemberOverviewBoard } from '@jeiltodo/ui/entities';

export const MemberDetailPage = () => {
  const params = useParams();
  // const { tableFilters } = useTableContext();
  const { data, isLoading } = useGetMemberDetail(Number(params.id));

  if (isLoading || !data) return <LoadingSpinner />;

  const { goals, groups, ...rest } = data;
  return (
    <div className='w-[930px]'>
      <h1 className='sr-only'>
        jtodo 서비스의 도메인을 조회, 삭제할 수 있는 관리 페이지입니다.
      </h1>
      <div className='w-full flex gap-5'>
        <MemberOverviewBoard member={rest} />
        <GroupBoard groups={data.groups} />
      </div>
      <div className='w-[930px] py-5 px-5 bg-white rounded-xl mt-5 relative'>
        <BoardTitle title='개인 목표' className='mb-5' />
        {/* <TableToolBar totalCount={data?.totalCount} /> */}
        {data.goals.length !== 0 ? (
          <MemberGoalTable memberGoals={data.goals} />
        ) : (
          <div className='min-h-[120px] flex justify-center items-center text-lg text-slate-500 font-semibold'>
            {' '}
            목표가 없습니다
          </div>
        )}
        {/* <Pagination
          onNext={() => {}}
          onPrev={() => {}}
          onClickPage={() => {}}
          totalCount={data?.totalCount || 1}
          limit={10}
          currentPage={data?.currentPage || 1}
        /> */}
      </div>
    </div>
  );
};
