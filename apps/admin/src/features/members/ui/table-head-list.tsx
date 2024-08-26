import { Table } from '../../../shared';

type SimpleTableHeadMap<T> = {
  criteria: keyof T;
  title: string;
  withSort?: boolean;
};

interface TableHeadListProps<T> {
  headMap: SimpleTableHeadMap<T>[];
}

export function TableHeadList<T>({ headMap }: TableHeadListProps<T>) {
  return (
    <>
      {headMap.map(({ criteria, title, withSort }) => {
        return withSort ? (
          <Table.HeadWithSort
            key={criteria as string}
            criteria={criteria as string}
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
