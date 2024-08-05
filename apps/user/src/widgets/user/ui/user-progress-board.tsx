import { DoughnutGraph } from '@jeiltodo/icons';

interface ProgressBoardProps {
  completedPercent?: number;
}
export const ProgressBoard: React.FC<ProgressBoardProps> = ({
  completedPercent = 74,
}) => {
  return (
    <section
      className='relative h-[250px] flex flex-row bg-blue-500 mobile:w-[343px] tablet:w-[306px] desktop:w-[588px] rounded-[12px] p-base
    transition-all duration-300 ease-in-out'
    >
      <div className='absolute flex flex-col gap-y-[16px] text-white text-lg'>
        <span className='w-[40px] h-[40px] flex items-center justify-center bg-slate-900 rounded-[15px]'>
          <DoughnutGraph className='w-[17px]' />
        </span>
        <h2>내 진행 상황</h2>
        <span>
          <em className='text-3xl font-pretendard-semibold not-italic mr-[4px]'>
            {completedPercent}
          </em>
          &#37;
        </span>
      </div>
      <DoughnutGraph className='absolute -right-10 -bottom-20 w-[224px] opacity-10  rotate-45' />
    </section>
  );
};
// “progress”: {
//   “completedPerecent” : number,
//      “members”: {
//         “name”: string,
//         “color” string,
//         “contributionPercent”: number
//      }
//  }
