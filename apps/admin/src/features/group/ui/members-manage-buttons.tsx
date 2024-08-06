import { Button, ButtonGroup } from '@jeiltodo/ui/shared';
import { useBoardContext } from '@jeiltodo/ui/shared';
import { BoardMode } from '@jeiltodo/ui/shared';

export const MembersManageButtons = () => {
  const { mode, changeMode } = useBoardContext();

  const handleChangeMode = (mode: BoardMode) => {
    changeMode(mode);
  };

  const handleCancle = () => {
    changeMode('default');
  };

  const handleSave = () => {
    // POST call and revalidate
    // toast
    changeMode('default');
  };
  return (
    <>
      {mode === 'default' && (
        <ButtonGroup>
          <Button
            variant='outline'
            className='bg-white py-2 px-[10px]'
            onClick={() => {
              handleChangeMode('change-leader');
            }}
          >
            그룹장 변경
          </Button>
          <Button
            variant='dark'
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
