// 'use client';
// import { Sort } from '@jeiltodo/icons';
// import type { ImageProps } from 'next/image';
// import { useState } from 'react';

// interface SortButtonProps {
//   onSort: (isAscending: boolean) => void;
// }

// export function SortButton({ onSort, ...props }: SortButtonProps) {
//   const [isAscending, setIsAscending] = useState<boolean>(true);

//   const handleSort = () => {
//     setIsAscending((prev) => !prev);
//     onSort(!isAscending);
//   };
//   return (
//     <Sort onClick={handleSort} className='cursor-pointer w-6 h-6' {...props} />
//   );
// }
