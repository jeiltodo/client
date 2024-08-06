import { ImgProfile } from '@jeiltodo/icons';
import { BoardLayout } from '../../../shared/ui/board-layout';
import { InputSwapMode } from '../../../shared/ui/input-swap-mode';
import { Field } from '../../../shared/ui/field';

export const UserOverviewBoard = () => {
  return (
    <BoardLayout title='회원 정보'>
      <div className='pt-4 flex gap-9 border-b border-slate-200 pb-4'>
        <ImgProfile width={120} height={120} className='min-w-[120px]' />

        <div className='flex flex-wrap gap-4'>
          <InputSwapMode
            labelText='이름'
            inputName='name'
            defaultValue='홍길동'
          />
          <InputSwapMode
            labelText='이메일'
            inputName='email'
            defaultValue='hi@todo.com'
          />
          <Field label='가입일'>2024. 10. 10</Field>
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
