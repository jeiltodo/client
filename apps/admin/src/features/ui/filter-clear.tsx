import { Button } from '@jeiltodo/ui';

interface FilterClearProps {
  setStates: React.Dispatch<React.SetStateAction<string>>[];
}

export const FilterClear = ({ setStates }: FilterClearProps) => {
  const handleClick = () => {
    setStates.forEach((setState) => setState('')); // 상태 초기화 로직 (여기서는 빈 문자열로 초기화)
  };

  return (
    <Button variant='outline' className='w-[84px] h-[36px]' onClick={handleClick}>
      초기화
    </Button>
  );
};
