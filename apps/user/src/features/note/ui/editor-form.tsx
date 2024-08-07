import { Counter, Input } from '@jeiltodo/ui/shared';
import { useState } from 'react';

export const EditorForm = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [lengthWithoutSpaces, setLengthWithoutSpaces] = useState<number>(0);
  //todo:: 5분마다 임시저장 & 임시저장 완료 텍스트
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setTitle(value);
    }
  };
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const bodyWithoutSpace = changeTextWithoutSpace(value);

    setBody(value);
    setLengthWithoutSpaces(bodyWithoutSpace.length);
  };

  const changeTextWithoutSpace = (text: string) => {
    let changedText = text;
    changedText = changedText.replace(/\s+/g, '').trim();
    return changedText;
  };
  return (
    <div>
      <div className='flex flex-row gap-2 items-center justify-between border-y-[1px] border-slate-200'>
        <Input
          type='text'
          name='title'
          value={title}
          placeholder='노트의 제목을 입력해주세요'
          onChange={handleTitleChange}
          className='!px-0 w-full placeholder:text-lg placeholder:font-pretendard-medium'
        />
        <Counter data={title} limitNumber={30} />
      </div>
      <div className='flex flex-row text-right text-sm font-pretendard-medium py-[12px]'>
        <span>{`공백포함 : 총 `}</span>
        <span className='inline-block min-w-[20px] pl-[5px] pr-[1px]'>
          {body.length}
        </span>
        <span className='pr-[2px]'>{`자 |`}</span>
        <span>{`공백포함 : 총 `}</span>
        <span className='inline-block min-w-[20px] pl-[5px] pr-[1px]'>
          {lengthWithoutSpaces}
        </span>
        <span>{'자'}</span>
      </div>
      <textarea
        name='body'
        value={body}
        placeholder='이 곳을 클릭해 노트 작성을 시작해주세요'
        onChange={handleBodyChange}
        className='py-1 w-full h-screen resize-none placeholder:text-base placeholder:font-pretendard-medium rounded-xl focus:border-blue-500 focus:outline-none'
      ></textarea>
    </div>
  );
};
