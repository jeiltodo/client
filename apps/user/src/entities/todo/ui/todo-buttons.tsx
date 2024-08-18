import { Kebab, NoteView } from '@jeiltodo/icons';
import { Flyout } from '@jeiltodo/ui/shared';
import { useState } from 'react';

interface Props {
	onClickNote: () => void;
	onClickEdit: () => void;
	onClickRemove: () => void;
}
export const TodoButtons = ({
	onClickEdit,
	onClickRemove,
	onClickNote,
}: Props) => {
	const [isFlyoutOpen, setFlyoutOpen] = useState(false);

	const handleKebab = () => {
		setFlyoutOpen((prev) => !prev);
	};

	const handleEdit = () => {
		onClickEdit();
		setFlyoutOpen(false);
	};

	const handleRemove = () => {
		onClickRemove();
		setFlyoutOpen(false);
	};
	return (
		<div className='relative' onMouseLeave={() => setFlyoutOpen(false)}>
			<span className='inline-flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100'>
				<NoteView
					width={24}
					height={24}
					onClick={onClickNote}
					className='cursor-pointer'
				/>
				<Kebab
					width={24}
					height={24}
					onClick={handleKebab}
					className='cursor-pointer'
				/>
			</span>
			{isFlyoutOpen && <Flyout onEdit={handleEdit} onDelete={handleRemove} />}
		</div>
	);
};
