'use client';
import { Back } from '@jeiltodo/icons';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

export const BackButton: FC = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return <Back className='w-6 h-6 cursor-pointer' onClick={handleBackClick} />;
};


