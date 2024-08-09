import { useState } from 'react';
import { Asignee } from '../model/type';
import { getGroupColorClass } from '../../group/indext';

export const TodoAsignee = () => {
  const [asignee, setAsignee] = useState<Asignee | null>(null);

  const getInitialLetter = (name: string) => {
    return name.slice(0, 1);
  };

  const handleEmpty = () => {
    // TODO:  asignee 정보는 해당 그룹 대시보드로 이동시 로컬에 저장해두어야 함
    setAsignee({
      id: 1,
      name: '최지영',
      color: '1',
    });
  };

  const handleAsigned = () => {
    setAsignee(null);
  };

  const handleAsigneeCircle = () => {
    asignee ? handleAsigned() : handleEmpty();
  };
  return (
    <span
      className='inline-flex justify-center items-center min-w-6 min-h-6 rounded-full border border-dashed border-slate-500 cursor-pointer'
      onClick={handleAsigneeCircle}
    >
      {asignee && (
        <span
          className={`inline-flex w-full h-full  min-w-6 min-h-6 rounded-full justify-center items-center text-xs ${getGroupColorClass(asignee.color)}`}
        >
          {getInitialLetter(asignee.name)}
        </span>
      )}
    </span>
  );
};
