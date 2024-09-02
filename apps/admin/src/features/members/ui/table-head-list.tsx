import { Table } from '../../../shared';

interface SimpleTableHeadMap<T> {
  criteria: keyof T;
  title: string;
  withSort?: boolean;
}

interface TableHeadListProps<T> {
  headMap: SimpleTableHeadMap<T>[];
}

export function TableHeadList<T>({ headMap }: TableHeadListProps<T>) {
  return (
    <>
      {headMap.map(({ criteria, title, withSort }) => {
        return withSort ? (
          <Table.HeadWithSort
            className='text-left'
            criteria={criteria as string}
            key={criteria as string}
          >
            {title}
          </Table.HeadWithSort>
        ) : (
          <Table.Head className='text-left' key={criteria as string}>
            {title}
          </Table.Head>
        );
      })}
    </>
  );
}
