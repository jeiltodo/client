'use client';

import { useState } from 'react';
import { Todo, TodoButtons, TodoModal } from '../../../entities/todo';
import { TodoContent } from '../../../entities/todo/ui/todo-item';
import type { Goal } from '../../../entities/goal';
import { ConfirmationModal } from '../../../shared';
import { useCheckTodo } from '../../../entities/todo/hooks/useCheckTodo';
import { useDeleteTodo } from '../../../entities/todo/hooks/useDeleteTodo';
import { goalQueryKeys } from '../../../entities/goal/hooks/queryKey';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
	todos: (Todo & { goal?: Goal })[];
	variant?: 'user' | 'group';
}

export const TodoList = ({ todos, variant = 'user' }: Props) => {
	console.log('todos: ', todos);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [removeModalOpen, setRemoveModalOpen] = useState(false);
	const [noteCreateModalOpen, setNoteCreateModalOpen] = useState(false);

	const { mutate: checkTodo } = useCheckTodo();
	const { mutate: deleteTodo } = useDeleteTodo();

	const queryClient = useQueryClient();
	console.log(variant);
	const handleClickEdit = () => {
		setEditModalOpen(true);
	};

	const handleClickRemove = () => {
		setRemoveModalOpen(true);
	};

	const handleClickNote = (noteId: number | undefined) => {
		if (noteId) {
			setEditModalOpen(true);
		} else {
			setNoteCreateModalOpen(true);
		}
	};

	const handleUrl = (todoId: number, noteId: number | undefined) => {
		const url = noteId
			? `/note/creat?todoId=${todoId}&noteId=${noteId}`
			: `/note/creat?todoId=${todoId}&noteId=new`;
		window.location.href = url;
	};
	const handleCheck = (todoId: number) => {
		checkTodo(todoId, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: goalQueryKeys.individual.todos(),
				});
				queryClient.invalidateQueries({
					queryKey: goalQueryKeys.individual.lists(),
				});
				queryClient.invalidateQueries({
					queryKey: goalQueryKeys.individual.single(goalId),
				});
				queryClient.invalidateQueries({
					queryKey: goalQueryKeys.individual.progress(),
				});
				queryClient.invalidateQueries({
					predicate: (query) => query.queryKey.includes('todos'),
				});
			},
		});
	};

	const handleRemove = (id: number) => {
		deleteTodo(id, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: goalQueryKeys.individual.todos(),
				});
				queryClient.invalidateQueries({
					predicate: (query) => query.queryKey.includes('todos'),
				});
				queryClient.invalidateQueries({
					queryKey: goalQueryKeys.individual.lists(),
				});
				queryClient.invalidateQueries({
					queryKey: goalQueryKeys.individual.single(goalId),
				});
			},
		});
		setRemoveModalOpen(false);
	};

	return (
		<ul className='w-full flex flex-wrap gap-2'>
			{todos.map(({ id, title, isDone, noteId, goal }) => (
				<li
					key={id}
					className='list-none w-full h-6 flex justify-between group '
				>
					<span className='inline-flex gap-2 items-center min-w-[80%]'>
						<TodoContent
							key={id}
							todo={{ id, title, isDone }}
							onCheck={handleCheck}
						/>
					</span>
					<TodoButtons
						onClickEdit={handleClickEdit}
						onClickRemove={handleClickRemove}
						onClickNote={() => handleClickNote(noteId || undefined)}
					/>
					{editModalOpen && (
						<TodoModal
							setTodoToggle={setEditModalOpen}
							initialTodo={{ id, title, isDone }}
							initialGoal={goal}
						/>
					)}
					{removeModalOpen && (
						<ConfirmationModal
							setModalToggle={setRemoveModalOpen}
							onSubmit={() => {
								handleRemove(id);
							}}
							submitButtonText='삭제'
						>
							정말 삭제하시겠습니까?
						</ConfirmationModal>
					)}
					{noteCreateModalOpen && (
						<ConfirmationModal
							setModalToggle={setNoteCreateModalOpen}
							onSubmit={() => handleUrl(id, goal.id, noteId)}
							submitButtonText='확인'
						>
							노트를 작성하시겠습니까?
						</ConfirmationModal>
					)}
				</li>
			))}
		</ul>
	);
};
