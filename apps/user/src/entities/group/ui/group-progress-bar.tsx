'use client';

import { useState } from 'react';
import { Member } from '../indext';

interface Props {
  progress: { completedPercent: number; members: Member[] };
  className?: string;
}

export const GroupProgressBar = ({ progress, className }: Props) => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const { members, completedPercent } = progress;
  let accumulatedPercent = 0;

  return (
    <div className='flex items-center justify-start gap-2'>
      <div
        className={`w-full h-1 bg-gray-200 rounded-md flex items-center ${className}`}
      >
        {members.map((member, index) => {
          accumulatedPercent += member.contributionPercent;
          return (
            <div
              key={index}
              className={`relative h-full transition-all duration-500 ease-in-out ${
                index === 0 ? 'rounded-l-md' : ''
              } ${index === members.length - 1 ? 'rounded-r-md' : ''}`}
              style={{
                width: `${member.contributionPercent}%`,
                backgroundColor: member.color,
              }}
              onMouseEnter={() => setHoveredMember(member.name)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {hoveredMember === member.name && (
                <div className='absolute left-1/2 top-2 transform -translate-x-1/2 text-slate-600 bg-white border border-slate-100 text-sm font-noraml rounded-[5px] px-3 py-2'>
                  {member.name}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className='block text-xs font-semibold text-slate-900 '>
        {completedPercent}%
      </p>
    </div>
  );
};