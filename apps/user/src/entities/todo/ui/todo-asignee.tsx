import { useAssignTodo } from '../hooks/useAssignTodo';

interface Props {
  todoId: number;
  asignee: {
    nickname: string;
    color: string;
  } | null;
}

export const TodoAssignee = ({ todoId, asignee }: Props) => {
  const { mutate: assignTodo } = useAssignTodo();

  const handleAssign = () => {
    assignTodo(todoId);
  };
  const getInitialLetter = (name: string) => {
    return name.slice(0, 1);
  };
  return (
    <span
      className={`inline-flex justify-center items-center min-w-[18px] min-h-[18px] rounded-full cursor-pointer ${!asignee && ' border border-dashed border-slate-500'} `}
      onClick={handleAssign}
    >
      {asignee && (
        <span
          className="inline-flex w-full h-full  min-w-6 min-h-6 rounded-full justify-center items-center text-xs text-white pt-0.5"
          style={{ backgroundColor: asignee.color }}
        >
          {getInitialLetter(asignee.nickname)}
        </span>
      )}
    </span>
  );
};
