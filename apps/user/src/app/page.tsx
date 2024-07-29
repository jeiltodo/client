'use client';
import { Button, Dropdown } from '@jeiltodo/ui';
import { Check } from '@jeiltodo/icons';

export default function Page(): JSX.Element {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <main>
      메인
      <Button variant='primary'>primary</Button>
      <Button variant='primary' isDisabled>
        primary disabled
      </Button>
      <Button variant='primary' fullWidth>
        primary full-Width{' '}
      </Button>
      <Button variant='rounded'>secondary button</Button>
      <Button variant='outline'>outline button</Button>
      <Button variant='success'>success button</Button>
      <Button variant='warning'>waring button</Button>
      <Button variant='error'>error button</Button>
      <Button variant='error' size='sm'>
        error button sm
      </Button>
      <Button variant='error' size='md'>
        error button md
      </Button>
      <Button variant='error' size='lg'>
        error button lg
      </Button>
      <Button variant='error' size='xl'>
        error button xl
      </Button>
      {/* 로그인 */}
      <Button isDisabled onClick={handleClick}>
        로그인 하기 disabled
      </Button>
      <Button onClick={handleClick}>로그인 하기</Button>
      {/* 네비게이션바 */}
      <Button onClick={handleClick}>+ 새 할 일</Button>
      <Button onClick={handleClick}>+ 새 목표</Button>
      {/* 대비보드 */}
      <Button onClick={handleClick}>모두 보기 {'>'}</Button>
      <Button onClick={handleClick}>+ 할일 추가</Button>
      <Button onClick={handleClick}>더보기 {'>'}</Button>
      {/* 모달팝업 */}
      <Button isDisabled fullWidth onClick={handleClick}>
        확인 full-Width disabled
      </Button>
      <Button fullWidth onClick={handleClick}>
        확인full-Width{' '}
      </Button>
      {/* 모달 두 버튼 나란히 */}
      <Button onClick={handleClick}>취소</Button>
      <Button onClick={handleClick}>확인</Button>
      <Button onClick={handleClick}>취소</Button>
      <Button onClick={handleClick}>불러오기</Button>
      {/* 노트 작성 */}
      <Button onClick={handleClick}>작성완료 disabled</Button>
      <Button onClick={handleClick}>작성완료</Button>
      {/* 가로로 길고 양쪽이 둥근 모양  */}
      <Button onClick={handleClick}>불러오기</Button>
      <Dropdown>
        <Dropdown.Toggle>목표를 선택하세요</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item value='목표 1'>목표 1</Dropdown.Item>
          <Dropdown.Item value='목표 2'>목표 2</Dropdown.Item>
          <Dropdown.Item value='목표 3'>목표 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </main>
  );
}
