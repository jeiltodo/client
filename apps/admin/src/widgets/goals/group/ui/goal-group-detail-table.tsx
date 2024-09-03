'use client';

import React, { useState } from 'react';
import { Checkbox, formatDateString } from '@jeiltodo/ui/shared';
import { AdminNote } from '@jeiltodo/icons';
import { Table, useTableCheck } from '../../../../shared';
import { TableHeadList } from '../../../../features/members';
import { NoteDetailSlide } from '../../../../entities/goals/note';
import type { GroupGoalTodos } from '../../../../entities/goals/group';
import { TODO_GROUP_TABLE_HEAD_MAP } from '../../../../features/goals/group';

interface GoalTodosGroupTableProps {
  goalTitle: string;
  todos: GroupGoalTodos[];
}

export function GoalTodosGroupTable({
  goalTitle,
  todos: todoGroupRows,
}: GoalTodosGroupTableProps) {
  const [noteToggle, setNoteToggle] = useState<boolean>(false);
  const [noteModalId, setNoteModalId] = useState<number | null>(null);
  const { isAllChecked, getIsChecked, handleAllCheck, handleCheck } =
    useTableCheck();

  const handleClickNote = (id: number) => {
    setNoteModalId(id);
    setNoteToggle(true);
  };

  return (
    <Table>
      <Table.Header>
        <Table.Row className='border-slate-400'>
          <Table.HeadWithCheck
            isChecked={isAllChecked}
            onChange={handleAllCheck}
          />
          <TableHeadList headMap={TODO_GROUP_TABLE_HEAD_MAP} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {todoGroupRows.map((todo) => (
          <Table.Row className='hover:bg-slate-50 ' key={todo.id}>
            <Table.Cell>
              <Checkbox
                className='text-center'
                isChecked={getIsChecked(todo.id)}
                onChange={() => {
                  handleCheck(todo.id);
                }}
              />
            </Table.Cell>
            <Table.Cell className='text-center'>{todo.id}</Table.Cell>
            <Table.Cell className='text-center'>{todo.title}</Table.Cell>
            <Table.Cell className='text-center'>
              {todo.isDone ? '완료' : '미완료'}
            </Table.Cell>
            <Table.Cell className='text-center'>
              {todo.writer.nickname}
            </Table.Cell>
            <Table.Cell className='text-center'>
              {todo.memberInCharge.nickname}
            </Table.Cell>
            <Table.Cell className='text-center'>
              {formatDateString(todo.updatedAt)}
            </Table.Cell>
            <Table.Cell className='text-center'>
              {todo.noteId ? (
                <button
                  onClick={() => {
                    handleClickNote(todo.id);
                  }}
                  type='button'
                >
                  <AdminNote className='w-9 h-9' />
                </button>
              ) : null}
            </Table.Cell>
            {noteToggle && noteModalId === todo.id ? (
              <NoteDetailSlide
                goalTitle={goalTitle}
                noteId={todo.noteId}
                setToggle={setNoteToggle}
              />
            ) : null}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
