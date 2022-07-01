import R from 'ramda';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const RANK_SIZE = parseInt(process.env.RANK_SIZE!);

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

const getMovedRank = (ranks: string[], position: number) => {
  if (ranks.length === 0) {
    return average(MIN, MAX);
  }

  const boundedRanks = [MAX, ...ranks, MIN];

  if (position > ranks.length) {
    return average(boundedRanks[ranks.length], MIN);
  } else if (position < 0) {
    return average(boundedRanks[0], boundedRanks[1]);
  } else {
    return average(boundedRanks[position], boundedRanks[position + 1]);
  }
};

const balancedRanks = (rankCount: number) => {
  const maxNum = parseInt(MAX) + 1;

  const newMinRank = Math.round(maxNum / (rankCount + 1));

  return R.range(0, rankCount)
    .reverse()
    .map(R.add(1))
    .map(R.multiply(newMinRank))
    .map(toRank);
};

export default {
  RANK_SIZE,
  MIN,
  MAX,
  average,
  toRank,
  getNewTopRank,
  balancedRanks,
  getMovedRank,
};
