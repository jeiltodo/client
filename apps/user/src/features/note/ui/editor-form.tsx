'use client';

import { Counter, Input } from '@jeiltodo/ui/shared';
import { useEffect, useState } from 'react';
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Link, LinkDelete, LinkEmbed } from '@jeiltodo/icons';
import { LinkModal } from './link-modal';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formats = [
  'bold',
  'italic',
  'underline',
  'align',
  'list',
  'bullet',
  'color',
];

interface EditorFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}

export const EditorForm = ({
  title,
  setTitle,
  content,
  setContent,
  link,
  setLink,
}: EditorFormProps) => {
  const [lengthWithoutSpaces, setLengthWithoutSpaces] = useState<number>(0);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [linkModal, setLinkModal] = useState<boolean>(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setTitle(value);
    }
  };

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const plainText = doc.body.textContent || '';

    // 전체 글자 수 (공백 포함)
    const totalLength = plainText.length;

    // 공백을 제거하고 글자 수 계산
    const contentWithoutSpaces = plainText.replace(/\s+/g, '');
    setLengthWithoutSpaces(contentWithoutSpaces.length);

    // 여기에 전체 글자 수를 저장하는 상태 변수를 추가하세요
    setTotalLength(totalLength);
  }, [content]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }],
        ],
      },
    }),
    []
  );

  return (
    <>
      {linkModal && (
        <LinkModal
          link={link}
          setLink={setLink}
          setLinkModalToggle={setLinkModal}
        />
      )}
      <div className='flex flex-col flex-grow w-full h-full relative'>
        {/* 제목 입력란 및 제목 글자 수 */}
        <div className='flex flex-row gap-2 items-center justify-between border-y-[1px] border-slate-200'>
          <Input
            type='text'
            name='title'
            value={title}
            autoFocus={true}
            placeholder='노트의 제목을 입력해주세요'
            onChange={handleTitleChange}
            className='!px-0 w-full h-[52px] placeholder:text-lg placeholder:font-pretendard-medium bg-white'
          />
          <Counter data={title.length} limitNumber={30} />
        </div>
        {/* 글자 수  */}
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row text-right text-xs font-pretendard-medium text-slate-800 py-[12px]'>
            <span>{`공백포함 : 총 `}</span>
            <span className='inline-block min-w-[20px]'>{totalLength}</span>
            <span className='pr-[2px]'>{`자 |`}</span>
            <span>{`공백제외 : 총 `}</span>
            <span className='inline-block min-w-[20px]'>
              {lengthWithoutSpaces}
            </span>
            <span>{'자'}</span>
          </div>
          <Counter data={totalLength} limitNumber={10000} />
        </div>
        {/* 파일url이 있으면 여기에 올라감 */}
        {link && (
          <div className='flex items-center justify-between bg-slate-200 h-[38px] py-[7px] px-[6px] rounded-[20px]'>
            <div className='flex items-center justify-start gap-2'>
              <LinkEmbed className='h-[18px] w-[18px]' />
              <div className='text-base font-normal text-slate-800'>{link}</div>
            </div>
            <LinkDelete
              className='h-[18px] w-[18px] cursor-pointer'
              onClick={() => setLink('')}
            />
          </div>
        )}
        {/* 에디터 */}
        <ReactQuill
          theme='snow'
          modules={modules}
          formats={formats}
          value={content}
          onChange={setContent}
          placeholder='내용을 입력해주세요'
          className=' max-h-[768px] bg-white'
        />
        <style jsx global>{`
          .ql-toolbar {
            display: block;
            position: absolute;
            bottom: 0px;
            left: 0px;
            z-index: 5;
            width: 100%;
            background-color: #ffffff;
            border-color: #e2e8f0;
            border-radius: 21.5px;
          }
          .ql-container {
            min-height: 50vh;
            border: none !important;
          }
          .ql-editor {
            min-height: 50vh;
            max-height: 70vh;
            font-size: 16px;
            line-height: 1.5;
            border: none;
          }
        `}</style>
        <Link
          className='w-6 h-6 absolute bottom-[10px] right-4 z-20 cursor-pointer'
          onClick={() => setLinkModal(true)}
        />
      </div>
    </>
  );
};
