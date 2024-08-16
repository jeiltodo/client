// 'use client';

// import { ButtonGroup } from '@jeiltodo/ui/shared';
// import { TableFilter } from '../../../model/table/type';
// import { FilterForm } from './filter-form';
// import { FilterClear } from './filter-clear';
// import { FilterSearch } from './filter-search';

// interface SearchFilterProps {
//   filters: TableFilter[];
// }

// export const SearchFilter: React.FC<SearchFilterProps> = ({ filters }) => {
//   return (
//     <div className='flex flex-col gap-3 w-[930px] py-[16px] px-[20px] bg-white rounded-xl'>
//       <div>
//         <FilterForm filters={filters} />
//       </div>
//       <div className='flex items-center justify-end border-t-[1px] border-slate-200 pt-3'>
//         <ButtonGroup gap={2}>
//           <FilterClear />
//           <FilterSearch<typeof filters> queries={filters} />
//         </ButtonGroup>
//       </div>
//     </div>
//   );
// };
