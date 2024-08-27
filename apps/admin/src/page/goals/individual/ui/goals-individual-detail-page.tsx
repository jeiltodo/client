'use client';
import { useParams } from 'next/navigation';
import { useGetAllIndividualGoalTodos } from '../../../../entities/goals/individual/hooks/useIndividualGoals';
import { Pagination, TableProvider, useTableContext } from '../../../../shared';
import { LayoutTitle, LoadingSpinner } from '@jeiltodo/ui/shared';
import { TableToolBar } from '../../../../shared/ui/@x/table-toolbar/table-toobar';

export const PostsIndividualDetailPage = () => {
  const params = useParams();
  const { tableFilters } = useTableContext();
  const { data, isLoading } = useGetAllIndividualGoalTodos(
    tableFilters,
    Number(params.id)
  );

  if (isLoading || !data) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='sr-only'>
        jtodo 서비스의 그룹 도메인을 조회, 삭제할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle title='할 일 관리' />
      <TableProvider>
        <div className='w-[930px] pb-[16px] px-5 bg-white rounded-xl mt-5 relative'>
          <TableToolBar totalCount={data?.totalCount} />
          {/* <GoalsIndividualTable goals={data.todos} /> */}
          <Pagination
            onNext={() => {}}
            onPrev={() => {}}
            onClickPage={() => {}}
            totalCount={data?.totalCount || 1}
            limit={10}
            currentPage={data?.currentPage || 1}
          />
        </div>
      </TableProvider>
    </div>
  );
};
