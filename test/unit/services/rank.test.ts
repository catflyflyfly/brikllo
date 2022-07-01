import 'reflect-metadata';
import * as chai from 'chai';
import fc from 'fast-check';

import rankService from '../../../src/services/rank';

const expect = chai.expect;

describe('Rank Service', () => {
  const arbitraryRankNumber = fc
    .nat()
    .map((n) => n % Math.pow(10, rankService.RANK_SIZE));

  const arbitraryRank = arbitraryRankNumber.map((n) => rankService.toRank(n));

  describe('.MAX', () => {
    it('should have length of RANK_SIZE', () => {
      expect(rankService.MIN).to.have.lengthOf(rankService.RANK_SIZE);
    });

    it('should be lesser or equal than any rank generated within RANK_SIZE scope', () => {
      fc.assert(
        fc.property(arbitraryRankNumber, (rank) => {
          expect(parseInt(rankService.MIN)).to.be.lessThanOrEqual(rank);
        }),
      );
    });
  });

  describe('.MAX', () => {
    it('should have length of RANK_SIZE', () => {
      expect(rankService.MAX).to.have.lengthOf(rankService.RANK_SIZE);
    });

    it('should be greater or equal than any rank generated within RANK_SIZE scope', () => {
      fc.assert(
        fc.property(arbitraryRankNumber, (rank) => {
          expect(parseInt(rankService.MAX)).to.be.greaterThanOrEqual(rank);
        }),
      );
    });
  });

  describe('.toRank', () => {
    it('should return rank with length of RANK_SIZE', () => {
      fc.assert(
        fc.property(fc.integer(), (rank) => {
          expect(rankService.toRank(rank)).to.have.lengthOf(
            rankService.RANK_SIZE,
          );
        }),
      );
    });

    it('should return rank with same value of input, given a natural number', () => {
      fc.assert(
        fc.property(fc.nat(), (rank) => {
          expect(parseInt(rankService.toRank(rank))).to.equal(rank);
        }),
      );
    });
  });

  describe('.average', () => {
    it('should return rank with length of RANK_SIZE', () => {
      fc.assert(
        fc.property(arbitraryRank, arbitraryRank, (rank1, rank2) => {
          expect(rankService.average(rank1, rank2)).to.have.lengthOf(
            rankService.RANK_SIZE,
          );
        }),
      );
    });

    it('should return rank which is right between given ranks, can be off by 1', () => {
      fc.assert(
        fc.property(arbitraryRank, arbitraryRank, (rank1, rank2) => {
          const average = parseInt(rankService.average(rank1, rank2));

          const distance1 = Math.abs(parseInt(rank1) - average);
          const distance2 = Math.abs(parseInt(rank2) - average);

          const distanceDiff = Math.abs(distance1 - distance2);

          expect(distanceDiff).to.be.lessThanOrEqual(1);
        }),
      );
    });
  });

  describe('.getNewTopRank', () => {
    describe('given undefined', () => {
      it('should return rank with length of RANK_SIZE', () => {
        expect(rankService.getNewTopRank(undefined)).to.have.lengthOf(
          rankService.RANK_SIZE,
        );
      });
    });

    describe('given non MAX', () => {
      const arbitraryNonTopRank = arbitraryRank.filter(
        (r) => r !== rankService.MAX,
      );

      it('should return rank with length of RANK_SIZE', () => {
        fc.assert(
          fc.property(arbitraryNonTopRank, (rank) => {
            expect(rankService.getNewTopRank(rank)).to.have.lengthOf(
              rankService.RANK_SIZE,
            );
          }),
        );
      });

      it('should return rank greater than given rank', () => {
        fc.assert(
          fc.property(arbitraryNonTopRank, (rank) => {
            const newTopRank = rankService.getNewTopRank(rank);

            expect(newTopRank).not.to.be.undefined;

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            expect(parseInt(newTopRank!)).to.be.greaterThan(
              parseInt(rank ?? '0'),
            );
          }),
        );
      });
    });

    describe('given MAX', () => {
      it('should return undefined', () => {
        expect(rankService.getNewTopRank(rankService.MAX)).to.be.undefined;
      });
    });
  });
});
