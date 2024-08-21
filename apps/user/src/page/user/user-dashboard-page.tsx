'use client';

import React, { useEffect } from 'react';
import { useGoalsWithTodos, progressAllOptions } from '../../entities/goal';
import { ProgressBoard, RecentTodoCard, UserGoalCard } from '../../widgets/user';
import { useInView } from 'react-intersection-observer';
import { BoardTitle, LoadingSpinner } from '@jeiltodo/ui/shared';
import Link from 'next/link';
import { ArrowRightGray } from '@jeiltodo/icons';
import { useQuery } from '@tanstack/react-query';

export const UserDashboardPage = () => {
  const { data: progress } = useQuery(progressAllOptions());
  const { data, hasNextPage, fetchNextPage, isLoading } = useGoalsWithTodos({
    limit: 2,
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      hasNextPage && fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <div className="flex flex-col desktop:!flex-row items-center gap-6 w-full">
        <div className="flex flex-col items-start gap-4 h-[250px] min-w-[280px] bg-white w-full desktop:max-w-[588px] rounded-[12px] p-base">
          <div className="flex items-center justify-between w-full h-10">
            <BoardTitle icon="BlueMarker" title="최근 등록한 할 일" />
            <Link href="/todo" className="flex items-center text-slate-600">
              <div className="text-sm font-medium pt-[2px]">모두보기</div>
              <ArrowRightGray width={24} height={24} className="text-slate-600" />
            </Link>
          </div>
          <RecentTodoCard />
        </div>
        <ProgressBoard completedPercent={progress?.progress ?? 0} />
      </div>
      <div className="desktop:max-w-[1200px] w-full first-letter:min-w-[280px] min-h-[50vh] flex-1 bg-white rounded-xl p-base relative">
        <BoardTitle icon="flag" title="개인 목표" />
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 mt-6 overflow-y-scroll scrollbar-hide">
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.goals.map(goal => (
                  <UserGoalCard key={goal.id} {...goal} />
                ))}
              </React.Fragment>
            ))}
            <div ref={ref} className="h-6"></div>
          </div>
        )}
      </div>
    </div>
  );
};
