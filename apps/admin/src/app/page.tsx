import React from 'react';
import { UserGroupBoard } from '../widgets/user';
import { UserGroupBoardProps } from '../widgets/user/model/type';

const userGroupBoardMock: UserGroupBoardProps = {
  user: {
    id: 1,
    email: 'johndoe@example.com',
    name: 'John Doe',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-07-10T15:00:00Z',
  },
  groups: [
    {
      id: 101,
      name: 'Development Team',
      registerAt: '2024-01-20T12:00:00Z',
    },
    {
      id: 102,
      name: 'Design Team',
      registerAt: '2024-02-05T14:30:00Z',
    },
    {
      id: 103,
      name: 'A Team',
      registerAt: '2024-02-05T14:30:00Z',
    },
    {
      id: 104,
      name: 'B Team',
      registerAt: '2024-02-05T14:30:00Z',
    },
  ],
  goals: [
    {
      id: 201,
      name: 'Improve code quality',
      registerAt: '2024-03-01T09:00:00Z',
    },
    {
      id: 202,
      name: 'Increase team collaboration',
      registerAt: '2024-04-15T11:00:00Z',
    },
  ],
};

export default function Page() {
  
  return (
    <main className=' p-4 '>
      <UserGroupBoard groups={userGroupBoardMock.groups} />
    </main>
  );
}
