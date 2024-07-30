import { Button } from '@jeiltodo/ui';

interface FilterClearProps {
  setStates: React.Dispatch<React.SetStateAction<string>>[];
}

export const FilterClear = ({ onClick }: FilterClearProps) => {
  const handleClick = () => {
    setStates.forEach((setState) => setState('')); // 상태 초기화 로직 (여기서는 빈 문자열로 초기화)
  };

  return (
    <Button variant='outline' fullWidth onClick={handleClick}>
      초기화
    </Button>
  );
};
