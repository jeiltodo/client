'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { BoardTitle, LoadingSpinner } from '@jeiltodo/ui/shared';
import { useTableContext } from '../../../shared';
import { sortBy } from '../../../shared/lib/sortBy';
import { TableToolBar } from '../../../shared/ui/@x/table-toolbar/table-toobar';
import { useGetMemberDetail } from '../../../entities/member/hooks/useGetMemberDetaili';
import { useGetAllIndividualGoals } from '../../../entities/goals/individual/hooks';
import { TablePagination } from '../../../features/goals/individual';
import { GroupBoard } from '../../../widgets/members';
import { MemberOverviewBoard } from '../../../widgets/members/ui/member-overview-board';
import { MemberGoalTable } from '../../../widgets/members/ui/member-goal-table';
import type { SortOptions } from '../../../shared/lib/sortBy';
import type { IndividualGoal } from '../../../entities/goals/individual/model';

export function MemberDetailPage() {
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
        <GroupBoard groups={groups} />
      </div>
      <div className='w-[930px] py-5 px-5 bg-white rounded-xl mt-5 relative'>
        <BoardTitle className='mb-5' title='개인 목표' />
        <TableToolBar totalCount={goals.goals.length} />
        {sortedGoals.length !== 0 || goals.goals.length !== 0 ? (
          <MemberGoalTable memberGoals={sortedGoals} />
        ) : (
          <div className='min-h-[120px] flex justify-center items-center text-lg text-slate-500 font-semibold'>
            목표가 없습니다
          </div>
        )}
        <TablePagination
          currentPage={goals.currentPage}
          totalCount={goals.goals.length}
        />
      </div>
    </div>
  );
}
