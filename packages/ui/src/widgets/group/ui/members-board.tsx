'use client';
import { Group as GroupIcon } from '@jeiltodo/icons';
import { MembersManageButtons } from '../../../features/group/ui/members-manage-buttons';
import {
  MembersBoardProvider,
  Pagination,
  useBoardContext,
} from '@jeiltodo/ui/shared';
import { MemberList } from '../../../features';
import { GroupWithMembers, Member } from '../../../entities';
import { getFormattedRanks } from '../../../entities/group/lib/getFormattedRanks';
import { useState } from 'react';

interface Props {
  group: GroupWithMembers;
  userId?: number;
  onChangeLeader: (id: number) => void;
  onRemoveMember: (id: number) => void;
}

export const MembersBorad = ({
  group,
  userId,
  onChangeLeader,
  onRemoveMember,
}: Props) => {
  const { mode } = useBoardContext();

  const leaderId = group.members.find((member) => member.isLeader)!.id;
  const isUserALeader = leaderId === userId;
  const [newLeaderId, setNewLeaderId] = useState<number>(leaderId);
  const [deletedId, setDeletedId] = useState<number | null>(null);

  const sortedMembers = group.members
    .map((member) => ({ id: member.id, rank: member.contributionRank }))
    .sort((a, b) => a.rank - b.rank);
  const lowestRankNum = sortedMembers.pop()!.rank;

  const formattedMembers = group.members
    .map((member) => ({
      ...member,
      contributionRank: getFormattedRanks(
        member.id,
        sortedMembers,
        lowestRankNum
      ),
    }))
    .filter((member) => member.id !== deletedId);

  const handleClientChange = (newLeaderId: number) => {
    setNewLeaderId(newLeaderId);
  };

  const handleClientRemove = (memberId: number) => {
    setDeletedId(memberId);
  };

  const handleSave = () => {
    mode === 'change-leader'
      ? onChangeLeader(newLeaderId)
      : deletedId && onRemoveMember(deletedId);
  };

  return (
    <div className='w-full px-6 py-4 rounded-lg bg-groupColor-500'>
      <div className='w-full h-full bg-avatar-background'>
        <div className='flex justify-between items-center mb-6'>
          <div className='flex gap-4 items-center'>
            <div className='flex gap-2 items-center'>
              <GroupIcon width={40} height={40} />
              <span className='font-semibold text-lg text-white'>구성원</span>
            </div>
            <div className='bg-white opacity-50 rounded-md w-fit h-fit px-1 py-[0.5]'>
              <span className='text-slate-800'>{group.members.length}</span>
              <span className='text-groupColor-500'>/10</span>
            </div>
          </div>

          {isUserALeader && <MembersManageButtons onSave={handleSave} />}
        </div>
        <MemberList
          members={formattedMembers}
          onClientChangeLeader={handleClientChange}
          onClientRemoveMember={handleClientRemove}
        />
        <Pagination
          totalCount={10}
          limit={8}
          currentPage={1}
          variant='secondary'
          className='mt-10'
          isGroup={true}
        />
      </div>
    </div>
  );
};
