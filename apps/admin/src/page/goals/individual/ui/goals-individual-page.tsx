'use client';
import { GOALS_INDIVIDUAL_FIILTERS } from '../../../../entities/goals/individual';
import { useGetAllIndividualGoals } from '../../../../entities/goals/individual/hooks/useIndividualGoals';
import { GoalIndividualPagination } from '../../../../features/goals/individual';
import {
  SearchFilter,
  TableToolBar,
  useTableContext,
} from '../../../../shared';
import { GoalsIndividualTable } from '../../../../widgets/goals/individual';
import { LayoutTitle, LoadingSpinner } from '@jeiltodo/ui/shared';

export const PostsIndividualPage = () => {
  const { tableFilters } = useTableContext();
  const { data, isLoading } = useGetAllIndividualGoals(tableFilters);

  if (isLoading || !data) return <LoadingSpinner />;

  const onHandleDelete = () => {};

  return (
    <div>
      <h1 className='sr-only'>
        jtodo 서비스의 그룹 도메인을 조회, 삭제할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle title='게시글 관리 - 개인 게시글' />

      <SearchFilter filters={GOALS_INDIVIDUAL_FIILTERS} />
      <div className='w-[930px] pb-[16px] px-5 bg-white rounded-xl mt-5 relative'>
        <TableToolBar
          onClickDelete={onHandleDelete}
          totalCount={data?.totalCount}
          searchedCount={data?.searchedCount}
        />
        {data?.goals ? (
          <GoalsIndividualTable goals={data?.goals} />
        ) : (
          <LoadingSpinner />
        )}
        <GoalIndividualPagination
          totalCount={data.totalCount}
          currentPage={data.currentPage}
        />
      </div>
    </div>
  );
};
