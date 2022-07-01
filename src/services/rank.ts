const RANK_SIZE = 10;

const MIN = ''.padStart(RANK_SIZE, '0');
const MAX = ''.padStart(RANK_SIZE, '9');

const average = (rank1: string, rank2: string) => {
  return toRank(Math.round((parseInt(rank1) + parseInt(rank2)) / 2));
};

function toRank(rankNumber: number): string {
  if (rankNumber < 0) {
    return toRank(0);
  }

  return rankNumber.toString().padStart(RANK_SIZE, '0');
}

const getNewTopRank = (currentTopRank?: string) => {
  const averageRank = average(currentTopRank ?? MIN, MAX);

  if (averageRank === currentTopRank) {
    return undefined;
  }

  return averageRank;
};

export default {
  RANK_SIZE,
  MIN,
  MAX,
  average,
  toRank,
  getNewTopRank,
};
