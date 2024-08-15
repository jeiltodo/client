import { useTableSort } from '../../../shared';
import { Table } from '../../../shared';
import { TableHeadMap } from '../../../shared/ui/table/type';

interface Props<T> {
  headMap: TableHeadMap<T>[];
}

export function TableHeadList<T>({ headMap }: Props<T>) {
  const handleSort = useTableSort<T>();
  return (
    <>
      {headMap.map(({ criteria, title, withSort }) => {
        return withSort ? (
          <Table.HeadWithSort
            key={criteria as string}
            onSort={(isAscending) => {
              handleSort({ isAscending, criteria });
            }}
          >
            {title}
          </Table.HeadWithSort>
        ) : (
          <Table.Head key={criteria as string}>{title}</Table.Head>
        );
      })}
    </>
  );
}
