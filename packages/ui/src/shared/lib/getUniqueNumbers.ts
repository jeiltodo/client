export const getUniqueNumbers = (prev: number[], id: number) => {
  const set = new Set(prev);

  if (set.has(id)) {
    set.delete(id);
  } else {
    set.add(id);
  }

  return Array.from(set);
};
