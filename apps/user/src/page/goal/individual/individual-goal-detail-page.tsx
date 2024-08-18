'use client';
import { Button, LayoutTitle } from '@jeiltodo/ui/shared';
import { NotesPushButton } from '../../../features/goal/ui/notes-push-button';
import { useIndividualSingleGoal } from '../../../entities/user/hooks/useSingleIndivGoals';
import { userOptions } from '../../../entities/user';
import { useQuery } from '@tanstack/react-query';
import { useSingleGoalTodo } from '../../../entities/todo/hooks/useSingleGoalTodo';
import { TitleProgressBarCard } from '../../../widgets/goal';
import { GoalModal } from '../../../features/goal';
import { ConfirmationModal } from '../../../shared';
import { useState } from 'react';
import {
	useDeleteSingleGoal,
	useEditSingleGoal,
} from '../../../entities/user/hooks/useSingleGoalMuate';
import { useRouter } from 'next/navigation';
import { SingleGoalTodo, TodoModal } from '../../../entities/todo';
import { Plus } from '@jeiltodo/icons';
import { useIndividualGoals } from '../../../entities/goal';
import { IndividualTodoDoneBoard } from '../../../widgets/todo';

export const IndividualGoalDetailPage = ({
	params,
}: {
	params: { id: number };
}) => {
	const router = useRouter();
	const goalId = Number(params.id);
	const { data: singleGoal, isLoading } = useIndividualSingleGoal(goalId);
	const { data: singleGoalTodo } = useSingleGoalTodo<SingleGoalTodo[]>(goalId);
	const { data: user } = useQuery(userOptions());
	const { data: goals } = useIndividualGoals();

	const goalsForModal =
		goals?.map((goal) => ({ id: goal.id, title: goal.title })) ?? [];

	const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
	const [isGoalToggleOpen, setIsGoalToggleOpen] = useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

	const { mutate: editGoal } = useEditSingleGoal();
	const { mutate: deleteGoal } = useDeleteSingleGoal();

	const handleEdit = ({ title }: { title: string }) => {
		editGoal({ goalId: singleGoal!.id, title });
	};

	const handleDelete = () => {
		deleteGoal(
			{ goalId: singleGoal!.id },
			{
				onSettled: () => {
					router.back();
				},
			}
		);
	};

	const openEditModal = () => {
		setIsGoalToggleOpen(true);
	};

	const openDeleteModal = () => {
		setIsConfirmOpen(true);
	};

	const openAddTodoModal = () => {
		setIsAddTodoModalOpen(true);
	};
	return (
		<div>
			{!isLoading && singleGoal && singleGoalTodo && (
				<>
					<LayoutTitle
						title={`${decodeURIComponent(user?.nickname ?? '개인')}의 목표`}
					/>
					<div className='flex flex-col gap-y-6'>
						<TitleProgressBarCard
							goalData={singleGoal}
							onEditGoal={openEditModal}
							onDeleteGoal={openDeleteModal}
						/>
						<NotesPushButton goalId={goalId} />
						<Button
							variant='text-blue'
							className='flex gap-1 items-center text-sm h-[20px]'
							onClick={openAddTodoModal}
						>
							<Plus width={16} height={16} />
							할일 추가
						</Button>
						<IndividualTodoDoneBoard todos={singleGoalTodo} goal={singleGoal} />

						{isGoalToggleOpen && (
							<GoalModal
								goalCreator={user?.nickname ?? ''}
								initialGoal={{ id: singleGoal.id, title: singleGoal.title }}
								setGoalModalToggle={setIsGoalToggleOpen}
								onMutateGoal={handleEdit}
							/>
						)}
						{isConfirmOpen && (
							<ConfirmationModal
								setModalToggle={setIsConfirmOpen}
								submitButtonText={'삭제'}
								onSubmit={handleDelete}
							>
								정말 삭제 하시겠어요?
							</ConfirmationModal>
						)}
						{isAddTodoModalOpen && (
							<TodoModal
								todoCreator={user?.nickname ?? '개인'}
								setTodoModalToggle={setIsAddTodoModalOpen}
								initialGoal={singleGoal}
								goals={goalsForModal}
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
};
