interface CardFlyoutProps {
	onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CardFlyout = ({ onEdit, onDelete }: CardFlyoutProps) => {
	return (
		<div
			className='absolute top-5 right-0 z-10 flex w-[81px]  transition-opactiy 
       opacity-100 duration-200 ease-out'
		>
			<div className='w-full flex-auto overflow-hidden text-center font-pretendard-light text-sm text-gray-900 rounded-xl shadow-sm'>
				<button
					className='block w-full hover:bg-gray-50 bg-white px-[16px] py-[8px] border-b-[1px] border-slate-50'
					onClick={(e) => {
						onEdit(e);
					}}
					type='button'
				>
					수정하기
				</button>
				<button
					className='block w-full hover:bg-gray-50 bg-white px-[16px] py-[8px]'
					onClick={(e) => {
						onDelete(e);
					}}
					type='button'
				>
					삭제하기
				</button>
			</div>
		</div>
	);
};
