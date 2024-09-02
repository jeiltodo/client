export const getGroupColorClass = (colorCode: string) => {
  const colorMap: Record<string, string> = {
    '1': 'bg-group-1',
  };

  return colorMap[colorCode];
};
