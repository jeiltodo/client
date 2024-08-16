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
import { BaseModal, MINUTES_WITH_MS } from '../../shared';
import { createNote, patchNote } from '../../entities/note';
import { useRouter } from 'next/navigation';
import { useNoteDetail } from '../../entities/note/hooks/useNoteDetail';

export const EditorPage = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [isLocalSaved, setIsLocalSaved] = useState<boolean>(false);
  const [isButtonView, setIsButtonView] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const { goalid, todoid, noteid } = useParams<{
    goalid: string;
    todoid: string;
    noteid: string;
  }>();
  //TODO:: 브라우저가 뒤로 가기가 되었을 때 작성중인 어쩌구 팝업 뜨게 하기
  const showToast = useToast();
  const router = useRouter();

  const { noteDetail, isLoading } = useNoteDetail(Number(noteid));

  const handleLocalSave = () => {
    const localData = {
      noteid: noteid as string,
      title: title.trim(),
      content: content.trim(),
    };
    if (noteid && title && content) {
      try {
        window.localStorage.setItem(`note${noteid}`, JSON.stringify(localData));
        showToast({
          message: '임시 저장이 완료되었습니다.',
          type: 'alert',
          autoClose: 2000,
        });
        setIsLocalSaved(true);
        setIsButtonView(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getLocalSave = () => {
    const savedData = localStorage.getItem(`note${noteid}`);
    setTitle(JSON.parse(savedData).title);
    setContent(JSON.parse(savedData).content);
  };

  const handleSave = () => {
    if (!noteid) {
      onCreateNote();
    } else {
      onPatchNote();
    }
  };
  const onCreateNote = async () => {
    try {
      const response = await createNote({
        todoId: todoid,
        title,
        content,
        linkUrl,
      });
      console.log('노트가 성공적으로 생성되었습니다:', response);
      // 필요한 추가 작업을 여기에 작성하세요 (예: 상태 업데이트, UI 변경 등)
    } catch (error) {
      console.error('노트 생성 중 오류가 발생했습니다:', error);
      // 오류 처리 로직을 여기에 추가하세요 (예: 사용자 알림 등)
    }
  };
  const onPatchNote = async () => {
    try {
      const response = await patchNote({
        noteId: noteid,
        title,
        content,
        linkUrl,
      });
      if (response.code === 200) setIsAlert(true);
    } catch (error) {
      console.error('노트 수정 중 오류가 발생했습니다:', error);
      // 오류 처리 로직을 여기에 추가하세요 (예: 사용자 알림 등)
    }
  };
  useEffect(() => {
    if (!isLoading && noteDetail?.data) {
      setTitle(noteDetail.data.title);
      setContent(noteDetail.data.content);
    }
  }, []);

  useEffect(() => {
    const showSaveToast = setInterval(() => {
      handleLocalSave();
    }, MINUTES_WITH_MS * 5);

    return () => clearInterval(showSaveToast);
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
      {!isLoading && noteDetail && (
        <>
          <BoardTitle
            className='mb-[12px]'
            icon='flag'
            iconSize={24}
            title={noteDetail.data.todo.title}
          />
          <TodoTitle className='mb-[24px]' title={noteDetail.data.todo.title} />
        </>
      )}
      <EditorForm
        content={content}
        setContent={setContent}
        setTitle={setTitle}
        title={title}
      />
      {isAlert && (
        <div className='w-[300px]'>
          <BaseModal setToggle={setIsAlert}>
            <div className='flex flex-col gap-3 items-center'>
              <p>저장 되었습니다!</p>
              <Button
                isDisabled={!title}
                className='w-[120px] mt-10 h-12'
                onClick={() => router.back()}
              >
                확인
              </Button>
            </div>
          </BaseModal>
        </div>
      )}
    </div>
  );
};
