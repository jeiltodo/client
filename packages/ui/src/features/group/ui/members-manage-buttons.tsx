'use client';
'use client';
import { Button, ButtonGroup } from '@jeiltodo/ui/shared';
import { useBoardContext } from '@jeiltodo/ui/shared';
import { BoardMode } from '@jeiltodo/ui/shared';

interface Props {
  onSave: () => void;
}

export const MembersManageButtons = ({ onSave }: Props) => {
  const { mode, changeMode } = useBoardContext();

  const handleChangeMode = (mode: BoardMode) => {
    changeMode(mode);
  };

  const handleCancle = () => {
    changeMode('default');
  };

  const handleSave = () => {
    onSave();
    changeMode('default');
  };
  return (
    <>
      {mode === 'default' && (
        <ButtonGroup>
          <button
            className='rounded-lg bg-white py-[8px] px-[10px] leading-4 text-orange-500'
            onClick={() => {
              handleChangeMode('change-leader');
            }}
          >
            그룹장 변경
          </button>
          <button
            className='rounded-lg bg-orange-900 py-[8px] px-[10px] leading-4 text-white'
            onClick={() => {
              handleChangeMode('manage-members');
            }}
          >
            구성원 관리
          </button>
        </ButtonGroup>
      )}
      {mode !== 'default' && (
        <ButtonGroup>
          <Button
            variant='outline-no-border'
            className='bg-white px-[10px] min-w-[84px] h-[36px]'
            onClick={() => {
              handleCancle();
            }}
          >
            취소
          </Button>
          <Button
            variant='group-dark'
            className='min-w-[84px] h-[36px]'
            onClick={() => {
              handleSave();
            }}
          >
            저장
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};
