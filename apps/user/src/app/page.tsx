'use client';
import React, { useState } from 'react';
import { ProgressBoard } from '../widgets/user/ui/progress-board';
import ProgressBar from '../../../../packages/ui/src/shared/ui/progress-bar';
const individualProgress = 75;
const groupProgress = {
  completedPercent: 80,
  members: [
    { name: '강낭콩', color: '#FF6B6B', contributionPercent: 30 },
    { name: '옥수수', color: '#4ECDC4', contributionPercent: 50 },
  ],
};
export default function Page() {
  const [percent, setPercent] = useState(74);

  const increasePercent = () => setPercent((prev) => Math.min(prev + 0.3, 100));
  const decreasePercent = () => setPercent((prev) => Math.max(prev - 0.3, 0));
  return (
    <main className=' p-4 '>
      <ProgressBoard completedPercent={percent} />
      <div className='mt-20 flex gap-5'>
        <button onClick={increasePercent} className='bg-blue-300 p-5'>
          증가
        </button>
        <button onClick={decreasePercent} className='bg-blue-300 p-5'>
          감소
        </button>
      </div>
      <div className='mb-6 bg-white'>
        <h2>개인 프로그레스</h2>
        <ProgressBar progress={individualProgress} />
      </div>
      <div className='mb-6 bg-white'>
        <h2>그룹 프로그레스</h2>
        <ProgressBar progress={groupProgress} />
      </div>
    </main>
  );
}
