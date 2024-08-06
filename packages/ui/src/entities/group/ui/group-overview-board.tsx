'use client';

import { BoardLayout } from '../../../shared/ui/@x/board-layout';
import { InputSwapMode } from '../../../shared/ui/input-swap-mode';
import { Field } from '../../../shared/ui/field';
import { useState } from 'react';

export const GroupOverviewBoard = () => {
  const [isRequested, setIsRequested] = useState<boolean>(false);

  const handleReissue = () => {
    setIsRequested((prev) => !prev);
  };
  return (
    <BoardLayout title='그룹 정보' className='max-w-[468px] max-h-[298px]'>
      <div className='pt-4 flex gap-9 border-b border-slate-200 pb-4'>
        <div className='w-full flex flex-wrap gap-4'>
          <InputSwapMode
            labelText='그룹 이름'
            inputName='name'
            defaultValue='슬리드'
          />
          <div className='w-full flex justify-between items-end'>
            <Field label='초대코드'>123456</Field>
            <button
              onClick={handleReissue}
              className={`min-w-[84px] h-9 border rounded-xl ${isRequested === false ? 'border-blue-500 text-blue-500 ' : 'bg-slate-900 text-white '}`}
            >
              {isRequested === false ? '재발행' : '취소'}
            </button>
          </div>
        </div>
      </div>
      <div className='w-full mt-4 flex justify-end'>
        <button className='inline-block w-[84px] h-9 border bg-blue-500 text-white rounded-xl'>
          저장
        </button>
      </div>
    </BoardLayout>
  );
};
