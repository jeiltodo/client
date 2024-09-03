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
  isAdmin?: boolean;
  group: GroupWithMembers;
  userId?: number;
  spareCode: string;
  onSave: (info: GroupTitleOrCode) => void;
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

  const [updatedCode, setUpdatedCode] = useState<string>(spareCode);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const isUserALeader = () => {
    if (!userId && isAdmin) {
      return true;
    }
    return members.find((member) => member.isLeader)?.id === userId;
  };

  const handleReissue = () => {
    if (isRequested) {
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

  const getRequestedButtonClass = () => {
    if (!isRequested) {
      return isAdmin
        ? 'border-blue-500 text-blue-500'
        : 'border-groupColor-500 text-groupColor-500';
    }
    return 'bg-slate-900 text-white ';
  };

  const GetSaveButtonClass = () => {
    if (isRequested && isEditMode) {
      return isAdmin ? 'bg-blue-500' : 'bg-orange-500';
    }
    return 'bg-slate-200';
  };

  return (
    <BoardLayout
      className={isAdmin ? 'w-[450px]' : 'tablet:min-w-[300px]'}
      isAdmin={isAdmin}
      title='그룹 정보'
    >
      <div
        className={`pt-4 flex gap-9 ${isUserALeader() && 'border-b border-slate-200 pb-4'}`}
      >
        <div className='w-full flex flex-wrap gap-2'>
          {isUserALeader() || isAdmin ? (
            <InputSwapMode
              defaultValue={title}
              isAdmin={isAdmin}
              isEditMode={isEditMode}
              isGroup={true}
              label='그룹 이름'
              onChange={setUpdatedTitle}
              onSwap={setIsEditMode}
              value={updatedTitle}
            />
          ) : (
            <Field label='그룹 이름'>{title}</Field>
          )}
          <div className='w-full flex justify-between items-end'>
            <Field label='초대코드'>
              <div className='flex items-end gap-2'>
                <div>{isRequested ? updatedCode : secretCode}</div>
                <CopyToClipboard onCopy={handleCopy} text={secretCode}>
                  <button
                    className='cursor-pointer inline-block min-h-[28px]'
                    type='button'
                  >
                    <CopyUser className='w-6 h-6' />
                  </button>
                </CopyToClipboard>
                {copied ? (
                  <span
                    className={`text-sm ${isAdmin ? 'text-blue-500' : 'text-orange-500'} ml-2`}
                  >
                    Copied!
                  </span>
                ) : null}
              </div>
            </Field>
            {isUserALeader() || isAdmin ? (
              <button
                className={`inline-block min-w-[84px] h-9 border rounded-xl ${getRequestedButtonClass()}`}
                onClick={handleReissue}
                type='button'
              >
                {!isRequested ? '재발행' : '취소'}
              </button>
            ) : null}
          </div>
          {!isAdmin && createdAt ? (
            <div className='flex w-50%'>
              <Field label='만든 사람'>{createUser}</Field>
              <Field label='만든 날'>{formatDateString(createdAt)}</Field>
            </div>
          ) : null}
        </div>
      </div>
      {isUserALeader() || isAdmin ? (
        <div className='w-full mt-4 flex justify-end'>
          <button
            className={`cursor-pointer inline-block w-[84px] h-9 border text-white rounded-xl ${GetSaveButtonClass()}`}
            disabled={!isRequested && !isEditMode}
            onClick={handleSave}
            type='button'
          >
            저장
          </button>
        </div>
      ) : null}
    </BoardLayout>
  );
};
