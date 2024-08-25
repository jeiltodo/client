'use client';

import { LayoutTitle } from '@jeiltodo/ui/shared';
import { GroupsManagementTable } from '../../../widgets/group';
import { SearchFilter, TableProvider, TableToolBar } from '../../../shared';
import { GROUP_SEARCH_FILTERS, useSearchGroups } from '../../../entities/group';
import { useState } from 'react';

export const GroupManagementPage = () => {
	const [limit, setLimit] = useState<string | number | undefined>(10);

	const { data, isLoading } = useSearchGroups({ page: 1, limit: limit });

	if (isLoading) return <div>Loading...</div>;

	const onHandleDelete = () => {};

	return (
		<div>
			<h1 className='sr-only'>
				jtodo 서비스의 그룹 도메인을 조회, 삭제할 수 있는 관리 페이지입니다.
			</h1>
			<LayoutTitle title='그룹 관리' />
			<TableProvider initialData={data?.data.groups}>
				<SearchFilter filters={GROUP_SEARCH_FILTERS} />
				<div className='w-[930px] pb-[16px] px-5 bg-white rounded-xl mt-5'>
					<TableToolBar
						onSelectDropdown={setLimit}
						onClickDelete={onHandleDelete}
						totalCount={10}
						searchedCount={4}
					/>
					<GroupsManagementTable />
				</div>
			</TableProvider>
		</div>
	);
};
