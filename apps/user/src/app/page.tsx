'use client'
import React, { useState } from 'react';
import { RecentFilter } from '../entities/todo';

const mockGoals = [
  {
    id: 1,
    title: "운동하기",
    memberId: 1,
    createdAt: "2024-08-04T21:19:13.320787",
    updatedAt: "2024-08-05T01:02:50.628978"
  },
  {
    id: 2,
    title: "라라라라라라라라라라라라책 읽기",
    memberId: 2,
    createdAt: "2024-08-04T22:19:13.320787",
    updatedAt: "2024-08-05T02:02:50.628978"
  },
  {
    id: 3,
    title: "다다다다다다다다다다다",
    memberId: 3,
    createdAt: "2024-08-04T23:19:13.320787",
    updatedAt: "2024-08-05T03:02:50.628978"
  },
  {
    id: 4,
    title: "나나나나나나나나나나나나나나나나나나나나나",
    memberId: 4,
    createdAt: "2024-08-05T00:19:13.320787",
    updatedAt: "2024-08-05T04:02:50.628978"
  },
  {
    id: 5,
    title: "가가가가가가가가가가가가가가가가가가가가가가가가가가",
    memberId: 5,
    createdAt: "2024-08-05T01:19:13.320787",
    updatedAt: "2024-08-05T05:02:50.628978"
  },
  {
    id: 6,
    title: "가가가가가가가가가가가가가가가가가가가가가가가가가가",
    memberId: 5,
    createdAt: "2024-08-05T01:19:13.320787",
    updatedAt: "2024-08-05T05:02:50.628978"
  },
  {
    id: 7,
    title: "가가가가가가가가가가가가가가가가가가가가가가가가가가",
    memberId: 5,
    createdAt: "2024-08-05T01:19:13.320787",
    updatedAt: "2024-08-05T05:02:50.628978"
  },
  {
    id: 8,
    title: "가가가가가가가가가가가가가가가가가가가가가가가가가가",
    memberId: 5,
    createdAt: "2024-08-05T01:19:13.320787",
    updatedAt: "2024-08-05T05:02:50.628978"
  },
  {
    id: 9,
    title: "가가가가가가가가가가가가가가가가가가가가가가가가가가",
    memberId: 5,
    createdAt: "2024-08-05T01:19:13.320787",
    updatedAt: "2024-08-05T05:02:50.628978"
  }
];


export default function Page() {
  const [goalIds, setGoalIds] = useState<number[]>([]);
  const [status, setStatus] = useState<boolean | null>(null);

  return (
    <main className='p-4 '>
      <div className='bg-white p-4'>
        <RecentFilter individualGoals={mockGoals} goalIds={goalIds} setGoalIds={setGoalIds} setStatus={setStatus} />
      </div>
      
    </main>
  );
}