export function calculateTotalPages(
  totalCount: number,
  itemsPerPage: number
): number {
  const fullPages = Math.floor(totalCount / itemsPerPage);
  const hasPartialPage = totalCount % itemsPerPage !== 0;
  return fullPages + (hasPartialPage ? 1 : 0);
}
