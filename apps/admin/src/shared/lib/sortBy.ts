type SortType = 'number' | 'date' | 'boolean' | 'localeEN' | 'localeKO';
type SortableValue = string | number | Date | boolean;

export interface SortOptions<T> {
  criteria: keyof T;
  isAscending?: boolean;
}

interface ObjectWithOptionalFields {
  id?: number;
  email?: string;
  todo?: string;
  goal?: string;
  isDone?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  groupCount?: number;
  groupName?: string;
  groupLeaderName?: string;
  creator?: string;
  assignee?: string;
  progress?: number;
}

function determineType(
  key: keyof ObjectWithOptionalFields,
  value: SortableValue
): SortType {
  if (key === 'id' || key === 'groupCount' || key === 'progress')
    return 'number';
  if (key === 'createdAt' || key === 'updatedAt') return 'date';
  if (key === 'isDone') return 'boolean';
  if (typeof value === 'string') {
    const firstChar = value.trim()[0];
    if (firstChar >= 'a' && firstChar <= 'z') return 'localeEN';
    if (firstChar >= 'ㄱ' && firstChar <= 'ㅎ') return 'localeKO';
  }
  return 'localeEN'; // 기본값
}

function isValidDate(date: Date | string): boolean {
  return date instanceof Date
    ? !isNaN(date.getTime())
    : !isNaN(Date.parse(date));
}

export function sortBy<T extends ObjectWithOptionalFields>(
  array: T[],
  options: SortOptions<T>
): T[] {
  const { criteria, isAscending = true } = options;

  return [...array].sort((a, b) => {
    const aValue = a[criteria] as SortableValue;
    const bValue = b[criteria] as SortableValue;

    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return isAscending ? 1 : -1;
    if (bValue === undefined) return isAscending ? -1 : 1;

    const type = determineType(
      criteria as keyof ObjectWithOptionalFields,
      aValue
    );
    let result: number;

    switch (type) {
      case 'number':
        result = (aValue as number) - (bValue as number);
        break;
      case 'date':
        if (
          isValidDate(aValue as Date | string) &&
          isValidDate(bValue as Date | string)
        ) {
          const aDate =
            aValue instanceof Date ? aValue : new Date(aValue as string);
          const bDate =
            bValue instanceof Date ? bValue : new Date(bValue as string);
          result = aDate.getTime() - bDate.getTime();
        } else {
          result = 0;
        }
        break;
      case 'boolean':
        result = aValue === bValue ? 0 : aValue ? -1 : 1;
        break;
      case 'localeEN':
        result = String(aValue).localeCompare(String(bValue), 'en');
        break;
      case 'localeKO':
        result = String(aValue).localeCompare(String(bValue), 'ko');
        break;
      default:
        result = String(aValue).localeCompare(String(bValue));
    }

    return isAscending ? result : -result;
  });
}
