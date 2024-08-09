export const getGroupColorClass = (colorCode: string) => {
  const colorMap: { [key: string]: string } = {
    '1': 'bg-group-1',
  };

  return colorMap[colorCode];
};
