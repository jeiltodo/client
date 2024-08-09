'use client';

import { useEffect, useState } from 'react';
import { RecentFilter } from '../entities/user';
import { GroupGoalCard } from '../widgets/group/ui/grouop-goal-card';
import { UserGoalCard } from '../widgets/user';

const Goals = [
  {
    id: 1,
    title: 'Javascript',
    todos: [
      {
        id: 1,
        done: false,
        title: '자바스크립트 비동기 처리',
      },
      {
        id: 2,
        done: true,
        title: '자바스크립트는 새로워',
      },
    ],
  },
  {
    id: 2,
    title: 'TypeScript',
    todos: [
      {
        id: 1,
        done: false,
        title: '타입스크립트는 어려웡',
      },
      {
        id: 2,
        done: true,
        title: '제네릭 새로워',
      },
    ],
  },
];

export type Query = { goalIds: number[] | []; status?: boolean | null };
export default function Page() {
  const [query, setQuery] = useState<Query>({
    goalIds: Goals.map((goal) => goal.id),
    status: null,
  });

  const handleClick = (query: Query) => {
    setQuery(query);
  };

  useEffect(() => {
    console.log('🐶🐶🐶🐶🐶🐶', query);
  }, [query]);
  return (
    <main className='p-4 '>
      <RecentFilter
        goals={Goals.map((goal) => ({ id: goal.id, title: goal.title }))}
        onClickFilter={handleClick}
      />
    </main>
  );
}
