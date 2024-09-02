'use client';

import { useState } from 'react';
import { BoardLayout } from "@jeiltodo/ui/src/shared/ui/@x/board-layout";
import { InputSwapMode } from "@jeiltodo/ui/src/shared/ui/input-swap-mode";
import { Field } from "@jeiltodo/ui/src/shared/ui/field";
import type { UserInterface } from '../model/type';
import { useUpdateMemberInfo } from '../../../entities/member/hooks/useUpdateMemberInfo';
import { formatDateString } from '@jeiltodo/ui/shared';
interface Props {
  member: UserInterface;
}

export function MemberOverviewBoard({ member }: Props) {
  const [isEditNameMode, setIsEditNameMode] = useState<boolean>(false);
  const [isEditEmailMode, setIsEditEmailMode] = useState<boolean>(false);
  const { mutate: updateMember } = useUpdateMemberInfo(member.id);

  const [updatedEmail, setUpdatedEmail] = useState(member.email);
  const [updatedNickname, setUpdatedNickname] = useState(member.nickname);

  const handleChangeName = (name: string) => {
    setUpdatedNickname(name);
  };

  const handleChangeEmail = (email: string) => {
    setUpdatedEmail(email);
  };
  const handleSave = () => {
    const updated: Partial<Pick<UserInterface, 'nickname' | 'email'>> = {};

    if (updatedNickname !== member.nickname) {
      updated.nickname = updatedNickname;
    }

    if (updatedEmail !== member.email) {
      updated.email = updatedEmail;
    }

    // 변경된 항목이 있는 경우에만 업데이트 요청
    if (Object.keys(updated).length > 0) {
      updateMember(updated);
    }

    setIsEditNameMode(false);
    setIsEditEmailMode(false);
  };

  return (
    <BoardLayout title='회원 정보'>
      <div className='pt-4 flex gap-9 border-b border-slate-200 pb-4'>
        <div className='flex flex-wrap gap-4'>
          <InputSwapMode
            defaultValue={member.nickname}
            isEditMode={isEditNameMode}
            label='이름'
            onChange={(nickname) => {
              handleChangeName(nickname);
            }}
            onSwap={setIsEditNameMode}
            value={updatedNickname}
          />
          <InputSwapMode
            defaultValue={member.email}
            isEditMode={isEditEmailMode}
            label='이름'
            onChange={(email) => {
              handleChangeEmail(email);
            }}
            onSwap={setIsEditEmailMode}
            value={updatedEmail}
          />
          <Field label='가입일'>{formatDateString(member.createdAt)}</Field>
        </div>
      </div>
      <div className='w-full mt-4 flex justify-end'>
        <button
          className='inline-block w-[84px] h-9 border bg-blue-500 text-white rounded-xl'
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </BoardLayout>
  );
}
