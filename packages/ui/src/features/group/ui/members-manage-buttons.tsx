'use client';

import {
  Button,
  ButtonGroup,
  useBoardContext,
  BoardMode,
} from '@jeiltodo/ui/shared';

interface MembersManageButtonsProps {
  onSave: () => void;
  isAdmin?: boolean;
}

export const MembersManageButtons = ({
  onSave,
  isAdmin = false,
}: MembersManageButtonsProps) => {
  const { mode, changeMode } = useBoardContext();

  const handleChangeMode = (boardMode: BoardMode) => {
    changeMode(boardMode);
  };

  const handleCancel = () => {
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
            className={`rounded-lg bg-white py-[8px] px-[10px] text-nowrap leading-4 ${isAdmin ? '' : 'text-orange-500'}}`}
            onClick={() => {
              handleChangeMode('change-leader');
            }}
            type='button'
          >
            그룹장 변경
          </button>
          <button
            className={`rounded-lg ${isAdmin ? 'bg-slate-950' : 'bg-orange-900'} py-[8px] px-[10px] text-nowrap leading-4 text-white`}
            onClick={() => {
              handleChangeMode('manage-members');
            }}
            type='button'
          >
            구성원 관리
          </button>
        </ButtonGroup>
      )}
      {mode !== 'default' && (
        <ButtonGroup>
          <Button
            className='bg-white px-[10px] min-w-[84px] h-[36px]'
            onClick={() => {
              handleCancel();
            }}
            type='button'
            variant={isAdmin ? 'outline' : 'outline-no-border'}
          >
            취소
          </Button>
          <Button
            className='min-w-[84px] h-[36px]'
            onClick={() => {
              handleSave();
            }}
            type='button'
            variant={isAdmin ? 'dark' : 'group-dark'}
          >
            저장
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};
