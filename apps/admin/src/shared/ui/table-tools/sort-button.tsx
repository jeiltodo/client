'use client';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';
import IconSort from '../../../../public/assets/icons/sort.svg';

interface Props extends Omit<ImageProps, 'src' | 'alt'> {
  onSort: (isAscending: boolean) => void;
}

export function SortButton({ onSort, ...props }: Props) {
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const handleSort = () => {
    setIsAscending((prev) => !prev);
    onSort(!isAscending);
  };
  return (
    <Image
      alt='sort button'
      height={24}
      onClick={handleSort}
      src={IconSort}
      width={24}
      className='cursor-pointer'
      {...props}
    />
  );
}
