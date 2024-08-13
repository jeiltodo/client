'use client';
import { useState, useEffect } from 'react';
import { GroupList, Plus, Search } from '@jeiltodo/icons';
import { Button } from '@jeiltodo/ui/shared';
import { SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';
import { client } from '../../../shared';
import { GoalProps, GroupProps } from '../model/type';
import { useGroupGoals } from '../../../entities/goal';

interface SidebarGroupNavProps {
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  group: GroupProps[] | undefined;
}

export const SidebarGroupNav = ({
  icon: Icon,
  title,
  group,
}: SidebarGroupNavProps) => {
  const [hoveredGroupId, setHoveredGroupId] = useState<number | null>(null);

  const { groupGoalsData } = useGroupGoals(hoveredGroupId);
  return (
    <div
      className='border-t-[1px] border-slate-200 flex flex-col gap-4 py-4'
      onMouseLeave={() => setHoveredGroupId(null)}
    >
      {group?.map((item) => (
        <div
          key={item.id}
          className='px-5 flex items-center justify-start gap-2 relative w-full h-9'
          onMouseEnter={() => setHoveredGroupId(item.id)}
        >
          <div className='flex items-center justify-start gap-2 w-[240px] h-9 hover:bg-slate-50 active:bg-slate-100 rounded-lg'>
            <Icon className='w-6 h-6' />
            <div className='block text-lg font-pretendard-medium text-slate-800'>
              {item.title}
            </div>
          </div>
          {hoveredGroupId === item.id &&
            groupGoalsData &&
            groupGoalsData.data.groupGoals.length > 0 && (
              <div className='absolute top-[52px] left-5 w-[240px] text-slate-800 z-10'>
                <ul>
                  {groupGoalsData.data.groupGoals.map((goal) => (
                    <li
                      key={goal.id}
                      className='text-sm font-medium w-full h-9 max-h-36 overflow-y-scroll scrollbar-hide flex items-center justify-start gap-2 pl-1 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100'
                    >
                      <GroupList className='w-6 h-6' />
                      <div>{goal.title}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};
