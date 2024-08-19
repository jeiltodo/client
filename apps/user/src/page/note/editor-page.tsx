'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DeleteCircle } from '@jeiltodo/icons';
import { useToast } from '@jeiltodo/ui/shared';
import { EditorForm } from '../../features/note';
import { BaseModal, MINUTES_WITH_MS } from '../../shared';
import { createNote, patchNote } from '../../entities/note';
import { useNoteDetail } from '../../entities/note/hooks/useNoteDetail';
import { Button, ButtonGroup, LayoutTitle } from '@jeiltodo/ui/shared';

export const EditorPage = () => {
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [linkUrl, setLinkUrl] = useState<string>('');
	const [isLocalSaved, setIsLocalSaved] = useState<boolean>(false);
	const [isButtonView, setIsButtonView] = useState<boolean>(false);
	const [isAlert, setIsAlert] = useState<boolean>(false);

	const params = useParams();
	const todoId = params.todoId;
	const noteId = params.noteId;

	//TODO:: 브라우저가 뒤로 가기가 되었을 때 작성중인 어쩌구 팝업 뜨게 하기
	const showToast = useToast();
	const router = useRouter();

	if (noteId !== 'new') {
		const { noteDetail, isLoading } = useNoteDetail(Number(noteId));
	}
	//TODO:: noteID가 없을 때 목표, 할일 제목 가져오기

	const handleLocalSave = () => {
		const localData = {
			noteid: Number(noteId),
			title: title.trim(),
			content: content.trim(),
		};
		if (noteId && title && content) {
			try {
				window.localStorage.setItem(`todo${todoId}`, JSON.stringify(localData));
				showToast({
					message: '임시 저장이 완료되었습니다.',
					type: 'alert',
					autoClose: 2000,
				});
				setIsLocalSaved(true);
				setIsButtonView(true);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const getLocalSave = () => {
		const savedData = localStorage.getItem(`todo${noteId}`);
		const parsedData = savedData
			? JSON.parse(savedData)
			: { title: '', content: '' };
		setTitle(parsedData.title);
		setContent(parsedData.content);
	};

	const handleSave = () => {
		if (noteId === 'new') {
			onCreateNote();
		} else {
			onPatchNote();
		}
	};
	const onCreateNote = async () => {
		try {
			const response = await createNote({
				todoId: Number(todoId),
				title,
				content,
				linkUrl,
			});
			response.code === 201 && router.back();
		} catch (error) {
			console.error('노트 생성 중 오류가 발생했습니다:', error);
			// 오류 처리 로직을 여기에 추가하세요 (예: 사용자 알림 등)
		}
	};
	const onPatchNote = async () => {
		try {
			const response = await patchNote({
				noteId: Number(noteId),
				title,
				content,
				linkUrl,
			});
			if (response.code === 200) setIsAlert(true);
		} catch (error) {
			console.error('노트 수정 중 오류가 발생했습니다:', error);
			// 오류 처리 로직을 여기에 추가하세요 (예: 사용자 알림 등)
		}
	};
	// useEffect(() => {
	//   if (!isLoading && noteDetail?.data) {
	//     setTitle(noteDetail.data.title);
	//     setContent(noteDetail.data.content);
	//   }
	// }, []);

	useEffect(() => {
		const showSaveToast = setInterval(() => {
			handleLocalSave();
		}, MINUTES_WITH_MS * 5);

		return () => clearInterval(showSaveToast);
	}, []);

	useEffect(() => {
		if (localStorage.getItem(`todo${todoId}`)) {
			setIsLocalSaved(true);
			setIsButtonView(true);
		} else {
			setIsLocalSaved(false);
			setIsButtonView(true);
		}
	}, [noteId]);

	return (
		<div
			className='flex flex-col max-w-[792px]'
			style={{ minHeight: 'calc(100vh - 48px)' }}
		>
			<LayoutTitle title={`노트 ${noteId === 'new' ? '작성' : '수정'}`}>
				<ButtonGroup>
					<Button
						className='w-[96px] h-[44px]'
						onClick={handleLocalSave}
						variant='text-blue'
						isDisabled={
							title.trim().length === 0 || content.trim().length === 0
						}
					>
						임시저장
					</Button>
					<Button
						className='w-[96px] h-[44px]'
						isDisabled={
							title.trim().length === 0 || content.trim().length === 0
						}
						onClick={handleSave}
					>
						저장 완료
					</Button>
				</ButtonGroup>
			</LayoutTitle>
			{isLocalSaved && isButtonView && (
				<div className='flex flex-row items-center justify-between bg-[#eff6ff] text-[#3b82f6] rounded-[28px] text-[14px] font-pretendard-medium px-3 pl-6 py-0 shadow-none min-h-[56px] h-[56px] mb-6'>
					<div className='flex flex-row items-center gap-4'>
						<button
							type='button'
							onClick={() => setIsButtonView(false)}
							className='cursor-pointer'
						>
							<DeleteCircle width={24} height={24} />
						</button>
						<p>임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?</p>
					</div>
					<Button
						variant='rounded-outline-blue'
						className='block px-3 !text-sm !h-[36px] leading-5'
						onClick={getLocalSave}
					>
						불러오기
					</Button>
				</div>
			)}
			{/* {noteId !== 'new' ? (
				noteId !== 'new' &&
				!isLoading && (
					<>
						<BoardTitle
							className='mb-[12px]'
							icon='flag'
							iconSize={24}
							title={noteDetail.data.todo.title || '목표'}
						/>
						<TodoTitle
							className='mb-[24px]'
							title={noteDetail.data.todo.title}
						/>
					</>
				)
			) : (
				<div>새로 작성중인 노트입니다.</div>
			)}  */}
			<EditorForm
				content={content}
				setContent={setContent}
				setTitle={setTitle}
				title={title}
			/>
			{isAlert && (
				<div className='w-[300px]'>
					<BaseModal setToggle={setIsAlert}>
						<div className='flex flex-col gap-3 items-center'>
							<p>저장 되었습니다!</p>
							<Button
								isDisabled={!title}
								className='w-[120px] mt-10 h-12'
								onClick={() => router.back()}
							>
								확인
							</Button>
						</div>
					</BaseModal>
				</div>
			)}
		</div>
	);
};
