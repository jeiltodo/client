'use client';
import type { ImageProps } from 'next/image';
import { useState } from 'react';
import IconSort from '../../../../public/assets/icons/sort.svg';

interface SortButtonProps extends Omit<ImageProps, 'src' | 'alt'> {
  onSort: (isAscending: boolean) => void;
}

export function SortButton({ onSort, ...props }: SortButtonProps) {
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const handleSort = () => {
    setIsAscending((prev) => !prev);
    onSort(!isAscending);
  };
  return (
    <IconSort
      onClick={handleSort}
      className='cursor-pointer w-6 h-6'
      {...props}
    />
  );
}
