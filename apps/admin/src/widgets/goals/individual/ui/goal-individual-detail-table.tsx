'use client';

import React, { useState } from 'react';

import { Checkbox, formatDateString } from '@jeiltodo/ui/shared';

import { Table } from '../../../../shared';
import { useTableCheck } from '../../../../shared';

import {
  IndividualGoalTodos,
} from '../../../../entities/goals/individual';
import { TODO_INDIVIDUAL_TABLE_HEAD_MAP } from '../../../../features/goals/individual';
import { TableHeadList } from '../../../../features/members';
import { AdminNote, Note } from '@jeiltodo/icons';
import { NoteDetailSlide } from '../../../../entities/goals/note';

interface Props {
  goalTitle: string;
  todos: IndividualGoalTodos[];
}

export function GoalTodosIndividualTable({
  goalTitle,
  todos: todoIndividualRows,
}: Props) {

  const [noteToggle, setNoteToggle] = useState<boolean>(false);
  const [noteModalId, setNoteModalId] = useState<number | null>(null);
  const { isAllChecked, getIsChecked, handleAllCheck, handleCheck } =
    useTableCheck(todoIndividualRows);

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
          <TableHeadList headMap={TODO_INDIVIDUAL_TABLE_HEAD_MAP} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {todoIndividualRows.map((todo) => (
          <Table.Row key={todo.id}>
            <Table.Cell>
              <Checkbox
                isChecked={getIsChecked(todo.id)}
                onChange={() => {
                  handleCheck(todo.id);
                }}
              />
            </Table.Cell>
            <Table.Cell>{todo.id}</Table.Cell>
            <Table.Cell>{todo.title}</Table.Cell>
            <Table.Cell>{todo.isDone ? '완료' : '미완료'}</Table.Cell>
            <Table.Cell>{formatDateString(todo.updatedAt)}</Table.Cell>
            <Table.Cell>
              {todo.noteId && (
                <button onClick={() => handleClickNote(todo.id)}>
                  <AdminNote className='w-9 h-9' />
                </button>
              )}
            </Table.Cell>
            {noteToggle && noteModalId === todo.id && (
              <NoteDetailSlide
                goalTitle={goalTitle}
                noteId={todo.noteId}
                setToggle={setNoteToggle}
              />
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
