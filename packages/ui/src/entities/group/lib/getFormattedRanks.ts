import { RANK_DEFAULT, RANK_HIGHST } from '../constants/contributionRank';

export const getFormattedRanks = (
  memberId: number,
  ranks: { id: number; rank: number }[],
  lowestRankNum: number
) => {
  if (lowestRankNum === RANK_HIGHST) return RANK_DEFAULT;
  const rankHighst = ranks.filter((member) => member.rank === RANK_HIGHST);
  const rankLowgest = ranks.filter((member) => member.rank === lowestRankNum);
  let formattedRank: number;
  if (rankHighst.find((member) => member.id === memberId)) {
    formattedRank = 1;
  } else if (rankLowgest.find((member) => member.id === memberId)) {
    formattedRank = -1;
  } else {
    formattedRank = 0;
  }
  return formattedRank;
};
