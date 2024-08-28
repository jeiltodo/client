'use client';
import { useParams } from 'next/navigation';
import { Pagination, useTableContext } from '../../../shared';
import { BoardTitle, LoadingSpinner } from '@jeiltodo/ui/shared';
import { MemberGoalTable } from '../../../widgets/members/ui/member-goal-table';
import { TableToolBar } from '../../../shared/ui/@x/table-toolbar/table-toobar';
import { useGetMemberDetail } from '../../../entities/member/hooks/useGetMemberDetaili';
import { GroupBoard } from '../../../widgets/members';
import { MemberOverviewBoard } from '../../../widgets/members/ui/member-overview-board';
import {
  IndividualGoal,
  useGetAllIndividualGoals,
} from '../../../entities/goals/individual';
import { TablePagination } from '../../../features/goals/individual';
import { useMemo } from 'react';
import { sortBy, SortOptions } from '../../../shared/lib/sortBy';

export const MemberDetailPage = () => {
  const { tableFilters, tableSort } = useTableContext();
  const params = useParams();
  const memberId = Number(params.id);
  const { data: memberDetail, isLoading } = useGetMemberDetail(memberId);
  const { data: goals } = useGetAllIndividualGoals({
    ...tableFilters,
    memberId,
  });

  const sortedGoals = useMemo(() => {
    return sortBy<IndividualGoal>(
      goals?.goals || [],
      tableSort as SortOptions<IndividualGoal>
    );
  }, [goals?.goals, tableSort]);

  if (isLoading || !memberDetail) return <LoadingSpinner />;
  if (!goals) return <LoadingSpinner />;
  const { groups, ...rest } = memberDetail;
  return (
    <div className='w-[930px]'>
      <h1 className='sr-only'>
        jtodo 서비스의 도메인을 조회, 삭제할 수 있는 관리 페이지입니다.
      </h1>
      <div className='w-full flex gap-5'>
        <MemberOverviewBoard member={rest} />
        <GroupBoard groups={memberDetail.groups} />
      </div>
      <div className='w-[930px] py-5 px-5 bg-white rounded-xl mt-5 relative'>
        <BoardTitle title='개인 목표' className='mb-5' />
        <TableToolBar totalCount={goals.goals.length} />
        {sortedGoals || goals?.goals.length !== 0 ? (
          <MemberGoalTable memberGoals={sortedGoals} />
        ) : (
          <div className='min-h-[120px] flex justify-center items-center text-lg text-slate-500 font-semibold'>
            목표가 없습니다
          </div>
        )}
        <TablePagination
          totalCount={goals.goals.length}
          currentPage={goals.currentPage}
        />
      </div>
    </div>
  );
};
