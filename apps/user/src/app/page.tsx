'use client';

import { Button, ButtonGroup, Dropdown, Input } from '@jeiltodo/ui';
import { ChangeEvent, useEffect, useState } from 'react';
import { IconCheck } from '@jeiltodo/icons';
    
export default function Page(): JSX.Element {
  const [inputValue, setInputValue] = useState<string | number>();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const handleClick = () => {
    console.log('Button clicked!');
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO: 인자로 only value or event (target의 name 사용 가능)
    setInputValue(e.target.value);
  };

  useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue]);

  return (
    <main>
      {/* 로그인 */}
      <div className='mb-3'>
        <h2 className='font-pretendard-bold text-2xl'>로그인</h2>
        <Button isDisabled fullWidth onClick={handleClick}>
          로그인 하기
        </Button>
        <Button fullWidth onClick={handleClick}>
          로그인 하기
        </Button>
      </div>

      {/* 네비게이션바 */}
      <div className='mb-3'>
        <h2 className='font-pretendard-bold text-2xl'>네비게이션바</h2>
        <Button onClick={handleClick}>+ 새 할 일</Button>
        <Button variant='outline' onClick={handleClick}>
          + 새 목표
        </Button>
      </div>

      {/* 대시보드 */}
      <div className='mb-3 bg-blue-50 py-5'>
        <h2 className='font-pretendard-bold text-2xl'>대시보드</h2>
        <Button variant='text-gray' onClick={handleClick}>
          모두 보기 {'>'}
        </Button>
        <Button variant='text-blue' onClick={handleClick}>
          + 할일 추가
        </Button>
        <Button variant='rounded-white' onClick={handleClick}>
          더보기 {'>'}
        </Button>
      </div>

      {/* 모달팝업 */}
      <div className='mb-3'>
        <h2 className='font-pretendard-bold text-2xl'>모달팝업</h2>
        <Button isDisabled fullWidth onClick={handleClick}>
          확인 full-Width
        </Button>
        <Button fullWidth onClick={handleClick}>
          확인 full-Width{' '}
        </Button>
      </div>

      {/* 모달 두 버튼 나란히 */}
      <div className='mb-3'>
        <h2 className='font-pretendard-bold text-2xl'>
          flex button group - minWidth 120px
        </h2>
        <ButtonGroup>
          <Button variant='outline' onClick={handleClick}>
            취소
          </Button>
          <Button onClick={handleClick}>확인</Button>
        </ButtonGroup>
      </div>
      <div className='mb-3'>
        <h2 className='font-pretendard-bold text-2xl'>
          flex button group - full width
        </h2>
        <ButtonGroup gap={1}>
          <Button variant='outline' fullWidth onClick={handleClick}>
            취소
          </Button>
          <Button fullWidth onClick={handleClick}>
            불러오기
          </Button>
        </ButtonGroup>
      </div>

      {/* 노트 작성 */}
      <div className='mb-3'>
        <h2 className='font-pretendard-bold text-2xl'>노트 작성</h2>
        <Button isDisabled onClick={handleClick}>
          작성완료
        </Button>
        <Button onClick={handleClick}>작성완료</Button>
      </div>

      {/* 가로로 길고 양쪽이 둥근 모양  */}
      <div className='mb-3'>
        <h2 className='font-pretendard-bold text-2xl'>둥근 버튼</h2>
        <Button variant='rounded-blue' onClick={handleClick}>
          불러오기
        </Button>
        <Button variant='rounded-blue' isDisabled onClick={handleClick}>
          불러오기
        </Button>
      </div>

      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle>목표를 선택하세요</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item value='목표 1'>목표 1</Dropdown.Item>
          <Dropdown.Item value='목표 2'>목표 2</Dropdown.Item>
          <Dropdown.Item value='목표 3'>목표 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className='mb-3'>
        <h2 className='font-pretendard-bold text-2xl'>인풋</h2>
        <Input
          type='text'
          value={inputValue}
          placeholder='할 일을 적어주세요'
          className='mt-4'
          onChange={handleInput}
        />
      </div>
    </main>
  );
}
