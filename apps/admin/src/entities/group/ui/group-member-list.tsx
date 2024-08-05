import { Profile } from '@jeiltodo/ui/entities';

export const GroupMemberList = () => {
  const members = [
    {
      id: 1,
      colorCode: 1,
      name: '체다치즈',
      contributionRank: 1,
    },
    {
      id: 2,
      colorCode: 2,
      name: '모짜렐라',
      isLeader: true,
      contributionRank: 0,
    },
    {
      id: 3,
      colorCode: 3,
      name: '고다치즈',
    },
    {
      id: 4,
      colorCode: 4,
      name: '부라타치즈',
    },
  ];

  const groupLeader = members.filter((member) => member.isLeader === true);
  const groupMembers = members.filter((member) => member.isLeader !== true);

  return (
    <div className='h-fit flex gap-6 items-center '>
      {groupLeader.map((member) => (
        <Profile key={member.id} member={member} />
      ))}
      {groupMembers.map((member) => (
        <Profile key={member.id} member={member} />
      ))}
    </div>
  );
};
