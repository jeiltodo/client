'use client';
import { useState } from 'react';
import {
  GOALS_INDIVIDUAL_FIILTERS,
  IndividualGoals,
} from '../../../../entities/goals/individual';
import { useGetAllIndividualGoals } from '../../../../entities/goals/individual/hooks/useIndividualGoals';
import {
  Pagination,
  SearchFilter,
  TableProvider,
  TableToolBar,
  useTableContext,
} from '../../../../shared';
import { GoalsIndividualTable } from '../../../../widgets/goals/individual';
import { LayoutTitle, LoadingSpinner } from '@jeiltodo/ui/shared';

export const PostsIndividualPage = () => {
  const [limit, setLimit] = useState<string | number | undefined>(10);
  console.log('limit: ', limit);
  
  const { data, isLoading } = useGetAllIndividualGoals({
    page: 1,
    limit: limit as number,
  });
 
  
  if (isLoading) return <LoadingSpinner />;

  const onHandleDelete = () => {};
 
  return (
    <div>
      <h1 className='sr-only'>
        jtodo 서비스의 그룹 도메인을 조회, 삭제할 수 있는 관리 페이지입니다.
      </h1>
      <LayoutTitle title='게시글 관리 - 개인 게시글' />
      <TableProvider<IndividualGoals> initialData={data?.data.goals}>
        <SearchFilter filters={GOALS_INDIVIDUAL_FIILTERS} />
        <div className='w-[930px] pb-[16px] px-5 bg-white rounded-xl mt-5 relative'>
          <TableToolBar
            onSelectDropdown={setLimit}
            onClickDelete={onHandleDelete}
            totalCount={data?.data.totalCount}
						searchedCount={data?.data.searchedCount}
          />
          <GoalsIndividualTable />
          <Pagination
            totalCount={data?.data.totalCount || 1}
            limit={10}
            currentPage={data?.data.currentPage || 1}
          />
        </div>
      </TableProvider>
    </div>
  );
};
