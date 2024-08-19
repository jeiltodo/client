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
          <Button
            variant='outline-no-border'
            className='bg-white px-[10px] text-groupColor-500 min-w-[84px] h-[36px]'
            onClick={() => {
              handleChangeMode('change-leader');
            }}
          >
            그룹장 변경
          </Button>
          <Button
            variant='group-dark'
            className='px-[10px] h-[36px]'
            onClick={() => {
              handleChangeMode('manage-members');
            }}
          >
            구성원 관리
          </Button>
        </ButtonGroup>
      )}
      {mode !== 'default' && (
        <ButtonGroup>
          <Button
            variant='outline'
            className='bg-white py-2 px-[10px] min-w-[84px]'
            onClick={() => {
              handleCancle();
            }}
          >
            취소
          </Button>
          <Button
            variant='dark'
            className='min-w-[84px]'
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
