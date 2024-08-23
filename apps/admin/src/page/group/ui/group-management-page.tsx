'use client';

import { LayoutTitle } from '@jeiltodo/ui/shared';
import { GroupsTable } from '../../../widgets/group';
import { SearchFilter, TableProvider, TableToolBar } from '../../../shared';
import { GROUP_SEARCH_FILTERS, useSearchGroups } from '../../../entities/group';
import { useState } from 'react';

export const GroupManagementPage = () => {
  const [limit, setLimit] = useState<string | number | undefined>(10);

  const { data, isLoading } = useSearchGroups({ page: 1, limit: limit });
  console.log('data: ', data);
  if (isLoading) return <div>Loading...</div>;

  const onHandleDelete = () => {};

  return (
    <div>
      <LayoutTitle title='그룹 관리' />
      <TableProvider>
        <SearchFilter filters={GROUP_SEARCH_FILTERS} />
        <div className='w-[930px] pb-[16px] px-5 bg-white rounded-xl mt-5'>
          <TableToolBar
            onSelectDropdown={setLimit}
            onClickDelete={onHandleDelete}
            totalCount={10}
            searchedCount={4}
          />
          <GroupsTable />
        </div>
      </TableProvider>
    </div>
  );
};
