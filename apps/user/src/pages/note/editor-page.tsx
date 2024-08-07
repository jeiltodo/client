'use client';
import { UserOverviewBoard } from '@jeiltodo/ui/entities';
import {
  BoardLayout,
  BoardTitle,
  Button,
  ButtonGroup,
  LayoutTitle,
  TodoTitle,
} from '@jeiltodo/ui/shared';
import { EditorForm } from '../../features/note';

export const EditorPage = () => {
  //TODO:: 각 버튼기능 / data가 있으면 저장 완료 disabled=false
  const handleLocalSave = () => {
    console.log('handleLocalSave');
  };
  const handleSave = () => {
    console.log('handleSave');
  };
  return (
    <>
      <LayoutTitle title='노트 작성'>
        <ButtonGroup>
          <Button
            variant='text-blue'
            className='w-[96px]'
            onClick={handleLocalSave}
          >
            임시저장
          </Button>
          <Button isDisabled={true} className='w-[96px]' onClick={handleSave}>
            저장 완료
          </Button>
        </ButtonGroup>
      </LayoutTitle>
      <BoardTitle
        title='자바스크립트로 웹 서비스 만들기'
        icon='flag'
        iconSize={24}
        className='mb-[12px]'
      />
      <TodoTitle title='자바스크립트 기초 챕터1 듣기' className='mb-[24px]' />
      <EditorForm />
    </>
  );
};
