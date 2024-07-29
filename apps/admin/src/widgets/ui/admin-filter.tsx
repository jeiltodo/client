'use client';
import { useState } from 'react';

import { ButtonGroup } from '@jeiltodo/ui';
import { FilterClear } from '../../features/ui/filter-clear';
import { FilterSearch } from '../../features/ui/filter-search';

export const AdminFilter = () => {
  const [name, setName] = useState('')
  
  const queryData = {
    name: name
  }
  return (
    <div>
      <div>fff</div>
      <div>
        <ButtonGroup gap={2}>
          <FilterClear setStates={[setName]} />
          <FilterSearch<typeof queryData> queryData={queryData} />
        </ButtonGroup>
      </div>
    </div>
  );
};
// const queryData = { name: '가나', data: 3 };

// <FilterButton<typeof queryData> queryData={queryData} />;
