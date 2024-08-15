'use client';

import { useEffect, useState } from 'react';
import {
  BoardTitle,
  Button,
  ButtonGroup,
  LayoutTitle,
  TodoTitle,
  useToast,
} from '@jeiltodo/ui/shared';
import { EditorForm } from '../../features/note';
import { useParams } from 'next/navigation';
import { DeleteCircle } from '@jeiltodo/icons';
import { MINUTES_WITH_MS } from '../../shared';

export const EditorPage = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isLocalSaved, setIsLocalSaved] = useState<boolean>(false);
  const [isButtonView, setIsButtonView] = useState<boolean>(false);
  const { goalid, todoid, noteid } = useParams<{
    goalid: string;
    todoid: string;
    noteid: string;
  }>();
  //TODO:: 브라우저가 뒤로 가기가 되었을 때 작성중인 어쩌구 팝업 뜨게 하기
  const showToast = useToast();
  const handleLocalSave = () => {
    const localData = {
      noteid: noteid as string,
      title: title.trim(),
      content: content.trim(),
    };
    if (noteid) {
      try {
        window.localStorage.setItem(`note${noteid}`, JSON.stringify(localData));
        showToast({
          message: '임시 저장이 완료되었습니다.',
          type: 'alert',
          autoClose: 2000,
        });
        setIsLocalSaved(true);
        setIsButtonView(true);
        console.log('savedData: ', JSON.parse(savedData));
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('페이지의 정보가 없습니다.');
    }
  };

  const getLocalSave = () => {
    const savedData = localStorage.getItem(`note${noteid}`);
    setTitle(JSON.parse(savedData).title);
    setContent(JSON.parse(savedData).content);
  };

  const handleSave = () => {
    console.log('노트 저장api 요청', title, content);
  };

  useEffect(() => {
    const showToast = setInterval(() => {
      if (title.trim().length !== 0 && content.trim().length !== 0)
        handleLocalSave();
    }, MINUTES_WITH_MS * 5);

    return () => clearInterval(showToast);
  }, []);

  useEffect(() => {
    if (localStorage.getItem(`note${noteid}`)) {
      setIsLocalSaved(true);
      setIsButtonView(true);
    } else {
      setIsLocalSaved(false);
      setIsButtonView(true);
    }
  }, [noteid]);

  return (
    <div
      className='flex flex-col max-w-[792px]'
      style={{ minHeight: 'calc(100vh - 48px)' }}
    >
      <LayoutTitle title={`노트 ${noteid === 'new' ? '작성' : '수정'}`}>
        <ButtonGroup>
          <Button
            className='w-[96px] h-[44px]'
            onClick={handleLocalSave}
            variant='text-blue'
            isDisabled={
              title.trim().length === 0 || content.trim().length === 0
            }
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
      {isLocalSaved && isButtonView && (
        <div className='flex flex-row items-center justify-between bg-[#eff6ff] text-[#3b82f6] rounded-[28px] text-[14px] font-pretendard-medium px-3 pl-6 py-0 shadow-none min-h-[56px] h-[56px] mb-6'>
          <div className='flex flex-row items-center gap-4'>
            <span
              onClick={() => setIsButtonView(false)}
              className='cursor-pointer'
            >
              <DeleteCircle width={24} height={24} />
            </span>
            <p>임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?</p>
          </div>
          <Button
            variant='rounded-outline-blue'
            className='block px-3 !text-sm !h-[36px] leading-5'
            onClick={getLocalSave}
          >
            불러오기
          </Button>
        </div>
      )}
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
