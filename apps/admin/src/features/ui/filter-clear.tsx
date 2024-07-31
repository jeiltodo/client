import { Button } from '@jeiltodo/ui';

interface FilterClearProps {
  setStates: React.Dispatch<React.SetStateAction<string>>[];
}

export const FilterClear = ({ setStates }: FilterClearProps) => {
  const handleClick = () => {
    setStates.forEach((setState) => {
      setState('')
    });
  };

  return (
    <Button variant='outline' className='w-[84px] h-[36px]' onClick={handleClick}>
      초기화
    </Button>
  );
};
