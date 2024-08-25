'use client';

import { BoardLayout } from '../../../shared/ui/@x/board-layout';
import { InputSwapMode } from '../../../shared/ui/input-swap-mode';
import { Field } from '../../../shared/ui/field';
import { useState } from 'react';
import { GroupTitleOrCode, GroupWithMembers } from '../model/type';
import { formatDateString } from '../../../shared';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyUser } from '@jeiltodo/icons';

interface GroupOverviewBoardProps {
	group: GroupWithMembers;
	userId?: number;
	spareCode: string;
	onSave: (info: GroupTitleOrCode) => void;
	isAdmin: boolean;
}

export const GroupOverviewBoard = ({
	group: { id, title, secretCode, members, createUser, createdAt },
	userId,
	spareCode,
	onSave,
	isAdmin = false,
}: GroupOverviewBoardProps) => {
	const [isRequested, setIsRequested] = useState<boolean>(false);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	console.log('createdAt: ', createdAt);

	const [updatedCode, setUpdatedCode] = useState<string>(spareCode);
	const [updatedTitle, setUpdatedValue] = useState(title);
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const isUserALeader =
		members.find((member) => member.isLeader)?.id === userId;

	const handleReissue = () => {
		if (isRequested === true) {
			setUpdatedCode(secretCode);
		} else {
			setUpdatedCode(spareCode);
		}

		setIsRequested((prev) => !prev);
	};

	const handleSave = () => {
		onSave({ secretCode: updatedCode, title: updatedTitle });

		setIsRequested(false);
		setIsEditMode(false);
	};

	return (
		<BoardLayout title='그룹 정보' className='tablet:min-w-[400px]'>
			<div
				className={`pt-4 flex gap-9 ${isUserALeader && 'border-b border-slate-200 pb-4'}`}
			>
				<div className='w-full flex flex-wrap gap-2'>
					{isUserALeader ? (
						<InputSwapMode
							label='그룹 이름'
							value={updatedTitle}
							defaultValue={title}
							isEditMode={isEditMode}
							isGroup={true}
							onChange={setUpdatedValue}
							onSwap={setIsEditMode}
							colorVariant='orange'
						/>
					) : (
						<Field label='그룹 이름'>{title}</Field>
					)}
					<div className='w-full flex justify-between items-end'>
						<Field label='초대코드'>
							<div className='flex items-end gap-2'>
								<div>{isRequested ? updatedCode : secretCode}</div>
								<CopyToClipboard text={secretCode} onCopy={handleCopy}>
									<button className='cursor-pointer'>
										<CopyUser className='w-6 h-6' />
									</button>
								</CopyToClipboard>
								{copied && (
									<span className='text-sm text-orange-500 ml-2'>Copied!</span>
								)}
							</div>
						</Field>
						{isUserALeader && (
							<button
								onClick={handleReissue}
								className={`inline-block min-w-[84px] h-9 border rounded-xl ${isRequested === false ? 'border-groupColor-500 text-groupColor-500 ' : 'bg-slate-900 text-white '}`}
							>
								{isRequested === false ? '재발행' : '취소'}
							</button>
						)}
					</div>
					{!isAdmin && (
						<div className='flex w-50%'>
							<Field label='만든 사람'>{createUser}</Field>
							<Field label='만든 날'>{formatDateString(createdAt)}</Field>
						</div>
					)}
				</div>
			</div>
			{isUserALeader && (
				<div className='w-full mt-4 flex justify-end'>
					<button
						disabled={isRequested !== true && isEditMode !== true}
						onClick={handleSave}
						className={`cursor-pointer inline-block w-[84px] h-9 border text-white rounded-xl ${isRequested === true || isEditMode === true ? ' bg-groupColor-500' : 'bg-slate-200'}`}
					>
						저장
					</button>
				</div>
			)}
		</BoardLayout>
	);
};
