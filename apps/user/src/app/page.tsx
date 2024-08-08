'use client'
import React, { useState } from 'react';
import { ProgressBoard } from '../widgets/user/ui/progress-board';

export default function Page() {
  const [percent, setPercent] = useState(74);

  const increasePercent = () => setPercent(prev => Math.min(prev + 0.3, 100));
  const decreasePercent = () => setPercent(prev => Math.max(prev - 0.3, 0));
  return (
    <main className=' p-4 '>
      <ProgressBoard completedPercent={percent} />
      <div className='mt-20 flex gap-5'>
        <button onClick={increasePercent} className='bg-blue-300 p-5'>증가</button>
        <button onClick={decreasePercent} className='bg-blue-300 p-5'>감소</button>
      </div>
    </main>
  );
}
