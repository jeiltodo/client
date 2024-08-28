// import { useTableSort } from '../../../shared';
// import { Table } from '../../../shared';
// import { TableHeadMap } from '../../../shared/ui/table/type';

// // TableHeadMap 타입을 간단한 예로 가정
// type SimpleTableHeadMap<T> = {
//   criteria: keyof T;
//   title: string;
//   withSort?: boolean;
// };

// interface TableHeadListProps<T> {
//   headMap: SimpleTableHeadMap<T>[];
// }

// export function MemberTableHeadList<T>({ headMap }: TableHeadListProps<T>) {
//   const handleSort = useTableSort<T>();

//   return (
//     <>
//       {headMap.map(({ criteria, title, withSort }) => {
//         return withSort ? (
//           <Table.HeadWithSort
//             key={criteria as string}
//             onSort={(isAscending) => {
//               handleSort({ isAscending, criteria });
//             }}
//           >
//             {title}
//           </Table.HeadWithSort>
//         ) : (
//           <Table.Head key={criteria as string}>{title}</Table.Head>
//         );
//       })}
//     </>
//   );
// }
