import { GroupGoalCard } from '../widgets/\bgroup/ui/goal-card';
import { UserGoalCard } from '../widgets/user';

const Goals = [
  {
    id: 1,
    title: 'Javascript',
    todos: [
      {
        id: 1,
        done: false,
        title: '자바스크립트 비동기 처리',
      },
      {
        id: 2,
        done: true,
        title: '자바스크립트는 새로워',
      },
    ],
  },
  {
    id: 2,
    title: 'TypeScript',
    todos: [
      {
        id: 1,
        done: false,
        title: '타입스크립트는 어려웡',
      },
      {
        id: 2,
        done: true,
        title: '제네릭 새로워',
      },
    ],
  },
];
export default function Page() {
  return (
    <main className='p-4 '>
      <div className='w-full flex flex-wrap gap-5'>
        {Goals.map((goal) => (
          <GroupGoalCard key={goal.id} {...goal} />
        ))}
      </div>
    </main>
  );
}
