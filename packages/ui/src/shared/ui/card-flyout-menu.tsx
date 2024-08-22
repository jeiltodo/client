interface Props {
	onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CardFlyout = ({ onEdit, onDelete }: Props) => {
	return (
		<div
			className='absolute top-5 right-0 z-10 flex w-[81px]  transition-opactiy 
       opacity-100 duration-200 ease-out'
		>
			<div className='w-full flex-auto overflow-hidden text-center font-pretendard-light text-sm text-gray-900 rounded-xl shadow-sm'>
				<button
					type='button'
					onClick={(e) => {
						onEdit(e);
					}}
					className='block w-full hover:bg-gray-50 bg-white px-[16px] py-[8px] border-b-[1px] border-slate-50'
				>
					수정하기
				</button>
				<button
					type='button'
					onClick={(e) => {
						onDelete(e);
					}}
					className='block w-full hover:bg-gray-50 bg-white px-[16px] py-[8px]'
				>
					삭제하기
				</button>
			</div>
		</div>
	);
};
