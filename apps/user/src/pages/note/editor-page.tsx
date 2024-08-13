'use client';

import { useEffect, useState } from 'react';
import {
  BoardTitle,
  Button,
  ButtonGroup,
  LayoutTitle,
  TodoTitle,
} from '@jeiltodo/ui/shared';
import { EditorForm } from '../../features/note';
import { useParams } from 'next/navigation';

export const EditorPage = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isLocalSaved, setIsLocalSaved] = useState<boolean>(false);
  const { goalid, todoid, noteid } = useParams<{
    goalid: string;
    todoid: string;
    noteid: string;
  }>();
  //TODO:: 각 버튼기능 / data가 있으면 저장 완료 disabled=false
  //TODO:: 5분마다 임시저장 & 임시저장 완료 토스트
  //TODO:: 브라우저가 뒤로 가기가 되었을 때 작성중인 어쩌구 팝업 뜨게 하기
  //임시저장된 내용이 있습니다. 뜨게하기
  const handleLocalSave = () => {
    const localData = {
      noteid: noteid as string,
      title: title.trim(),
      content: content.trim(),
    };
    if (noteid) {
      try {
        window.localStorage.setItem(`note${noteid}`, JSON.stringify(localData));
        console.log('JSON.stringify(localData): ', JSON.stringify(localData));
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('페이지의 정보가 없습니다.');
    }
  };

  const handleSave = () => {
    console.log('노트 저장api 요청', title, content);
  };

  useEffect(() => {
    const showToast = setInterval(() => {
      handleLocalSave();
    }, 60000 * 5);

    return () => clearInterval(showToast);
  }, []);

  useEffect(() => {
    localStorage.getItem(`note${noteid}`);
  }, []);

  return (
    <div className='max-w-[792px]'>
      <LayoutTitle title={`노트 ${noteid === 'new' ? '작성' : '수정'}`}>
        <ButtonGroup>
          <Button
            className='w-[96px] h-[44px]'
            onClick={handleLocalSave}
            variant='text-blue'
          >
            임시저장
          </Button>
          <Button
            className='w-[96px] h-[44px]'
            isDisabled={
              title.trim().length === 0 || content.trim().length === 0
            }
            onClick={handleSave}
          >
            저장 완료
          </Button>
        </ButtonGroup>
      </LayoutTitle>
      {/* localstorage에 있으면 노출 */}
      <Button
        variant='rounded-outline-blue'
        className='block px-3 !text-sm !h-[36px] leading-5'
        onClick={() => {
          console.log('토스트 onClick함수 click');
        }}
      >
        불러오기
      </Button>
      <BoardTitle
        className='mb-[12px]'
        icon='flag'
        iconSize={24}
        title='자바스크립트로 웹 서비스 만들기'
      />
      <TodoTitle className='mb-[24px]' title='자바스크립트 기초 챕터1 듣기' />
      <EditorForm
        content={content}
        setContent={setContent}
        setTitle={setTitle}
        title={title}
      />
    </div>
  );
};
