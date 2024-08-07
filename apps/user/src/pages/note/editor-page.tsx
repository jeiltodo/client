'use client';
import { Button, ButtonGroup, LayoutTitle } from '@jeiltodo/ui/shared';

export const EditorPage = () => {
  return (
    <div>
      <LayoutTitle title={'노트 작성'}>
        <ButtonGroup>
          <Button variant='text-blue' className='w-[96px]'>
            임시저장
          </Button>
          <Button isDisabled={true} className='w-[96px]'>
            저장 완료
          </Button>
        </ButtonGroup>
      </LayoutTitle>
    </div>
  );
};
