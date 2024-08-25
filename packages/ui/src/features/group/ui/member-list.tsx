'use client';
import { Member, Profile } from '../../../entities';
import { useBoardContext } from '@jeiltodo/ui/shared';
import { useEffect, useRef, useState } from 'react';

interface Props {
	members: Member[];
	onClientChangeLeader: (id: number) => void;
	onClientRemoveMember: (id: number) => void;
}

const debounce = (func: (...args: any[]) => void, wait: number) => {
	let timeout: NodeJS.Timeout;
	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
};

// eslint-disable-next-line react/function-component-definition
export const MemberList = ({
	members,
	onClientChangeLeader: onChangeLeader,
	onClientRemoveMember: onRemoveMember,
}: Props) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [profilesPerPage, setProfilesPerPage] = useState(10);

	console.log('currentIndex: ', currentIndex);
	console.log('profilesPerPage: ', profilesPerPage);

	const totalProfiles = members.length;

	const { mode } = useBoardContext();

	useEffect(() => {
		const itemWidth = 64;
		const itemGap = 24;
		const totalItemWidth = itemWidth + itemGap;

		const handleResize = debounce(() => {
			const width = window.innerWidth;
			const itemsPerPage =
				Math.floor(width / totalItemWidth) <= 10
					? Math.floor(width / totalItemWidth)
					: 10;
			const newProfilesPerPage = itemsPerPage > 0 ? itemsPerPage : 1;

			setProfilesPerPage(newProfilesPerPage);

			// 현재 인덱스를 새로운 profilesPerPage에 맞게 조정
			setCurrentIndex((prevIndex) => {
				const maxIndex = Math.max(0, totalProfiles - newProfilesPerPage);
				return Math.min(prevIndex, maxIndex);
			});
		}, 300);

		window.addEventListener('resize', handleResize);
		handleResize(); // 초기 실행

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [totalProfiles]);

	const handleRightSlide = () => {
		const maxIndex = totalProfiles - profilesPerPage;
		setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
	};

	const handleLeftSlide = () => {
		setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
	};

	const visibleProfiles = members.slice(
		currentIndex,
		currentIndex + profilesPerPage
	);

	const handleChangeLeader = (id: number) => {
		onChangeLeader(id);
	};

	const handleManageMembers = (id: number) => {
		onRemoveMember(id);
	};

	const translateX = -currentIndex * (64 + 24); // itemWidth + itemGap

	return (
		<div className='relative h-fit flex gap-6 items-center overflow-hidden'>
			{currentIndex !== 0 && (
				<button
					onClick={handleLeftSlide}
					className='absolute left-0 top-[50%] -translate-y-[50%] z-20 w-6 bg-slate-50 h-[118px] text-groupColor-500 cursor-pointer'
				>
					{`<`}
				</button>
			)}
			<div
				className='h-fit flex gap-6 items-center justify-around transition-all duration-500 ease'
				style={{ transform: `translateX(${translateX}px)` }}
			>
				{visibleProfiles.map((member) =>
					member.isLeader ? (
						<Profile key={member.id} member={member} mode={mode} />
					) : (
						<Profile
							key={member.id}
							member={member}
							mode={mode}
							onChangeRadio={handleChangeLeader}
							onClickRemove={handleManageMembers}
						/>
					)
				)}
			</div>
			{currentIndex < totalProfiles - profilesPerPage && (
				<button
					onClick={handleRightSlide}
					className='absolute right-0 top-[50%] z-20 -translate-y-[50%] w-6 bg-slate-50 h-[118px] text-groupColor-500 cursor-pointer'
				>
					{`>`}
				</button>
			)}
		</div>
	);
};
