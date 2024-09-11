interface FlyoutProps {
  onEdit: () => void;
  onDelete: () => void;
}
//ddf
export const Flyout = ({ onEdit, onDelete }: FlyoutProps) => {
  return (
    <div
      className='absolute top-4 right-0 z-10 flex w-[81px]  transition-opacity 
      opacity-100 duration-200 ease-out'
    >
      <div className='w-full flex-auto overflow-hidden text-center font-pretendard-light text-sm text-gray-900 rounded-xl shadow-sm'>
        <button
          className='block w-full hover:bg-gray-50 bg-white px-[16px] py-[8px] border-b-[1px] border-slate-50'
          onClick={onEdit}
          type="button"
        >
          수정하기
        </button>
        <button
          className='block w-full hover:bg-gray-50 bg-white px-[16px] py-[8px]'
          onClick={onDelete}
          type="button"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};
