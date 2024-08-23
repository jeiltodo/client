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
} from '../../../../shared';
import { GoalsIndividualTable } from '../../../../widgets/goals/individual';

export const PostsIndividualPage = () => {
  const [limit, setLimit] = useState<string | number | undefined>(20)
  console.log('limit: ', limit);
  const { data, isLoading } = useGetAllIndividualGoals({
    page: 1,
    limit: 10,
  });

  if (isLoading) return <div>Loading...</div>;

  const onHandleLimit = () => {};

  const onHandleDelete = () => {};

  return (
    <div>fsdffdsfwefewfewfew
      <TableProvider<IndividualGoals> initialData={data?.data.goals}>
        <SearchFilter filters={GOALS_INDIVIDUAL_FIILTERS} />fdsfsdfwefewfwefewfwe
        <div className='w-[930px] pb-[16px] px-5 bg-white rounded-xl mt-5'>
          <TableToolBar
            onSelectDropdown={setLimit}
            onClickDelete={onHandleDelete}
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
