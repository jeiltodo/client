export default function formatDateString(dateString: string) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }

  const year = String(date.getFullYear()).slice(-2); // 마지막 두 자리 연도
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (1-12)
  const day = String(date.getDate()).padStart(2, '0'); // 일 (1-31)

  return `${year}.${month}.${day}`;
}