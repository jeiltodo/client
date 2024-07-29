import Image, { ImageProps } from 'next/image';
import IconSort from '../../../public/assets/icons/sort.svg';
import { useState } from 'react';

interface Props extends Omit<ImageProps, 'src' | 'alt'> {
  onSort: (isAscending: boolean) => void;
}

const SortButton = ({ onSort, ...props }: Props) => {
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const handleSort = () => {
    setIsAscending((prev) => !prev);
    onSort(!isAscending);
  };
  return (
    <Image
      src={IconSort}
      alt='sort button'
      width={24}
      height={24}
      onClick={handleSort}
      {...props}
    />
  );
};

export default SortButton;
