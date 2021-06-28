class TotalAverages {
  constructor() {
    this.totalPayout = 0;
    this.totalDiff = 0;
    this.totalPool = 0;
    this.totalPayoutUP = 0;
    this.nbEntries = 0; //
    this.nbRoundUP = 0;
    this.totalPayoutDOWN = 0;
    this.nbRoundDOWN = 0;
    this.riskyWins = 0;
    this.riskyTotalPayout = 0;
    this.safeWins = 0;
    this.safeTotalPayout = 0;
  }

  getData() {
    return {
      nbEntries: this.nbRoundUP + this.nbRoundDOWN, //
      totalPayout: this.totalPayout,
      totalDiff: this.totalDiff,
      totalPool: this.totalPool,
      totalPayoutUP: this.totalPayoutUP,
      nbRoundUP: this.nbRoundUP,
      totalPayoutDOWN: this.totalPayoutDOWN,
      nbRoundDOWN: this.nbRoundDOWN,
      riskyWins: this.riskyWins,
      riskyTotalPayout: this.riskyTotalPayout,
      safeWins: this.safeWins,
      safeTotalPayout: this.safeTotalPayout,
    };
  }

  addPayout(payout) {
    this.totalPayout += payout;
    this.totalPayout;
  }

  addPool(pool) {
    this.totalPool += pool;
    this.totalPool;
  }

  addDiff(diff) {
    this.totalDiff += diff;
    this.totalDiff;
  }

  addRiskData(diff, payout, parsedUP, parsedDOWN) {
    if (diff > 0) {
      this.totalPayoutUP += payout;
      this.nbRoundUP++;
      if (parsedUP > parsedDOWN) {
        this.riskyWins++;
        this.riskyTotalPayout += payout;
      } else {
        this.safeWins++;
        this.safeTotalPayout += payout;
      }
    } else {
      this.totalPayoutDOWN += payout;
      this.nbRoundDOWN++;
      if (parsedUP < parsedDOWN) {
        this.riskyWins++;
        this.riskyTotalPayout += payout;
      } else {
        this.safeWins++;
        this.safeTotalPayout += payout;
      }
    }
  }
}

class Prediction {
  constructor() {
    this.nbEntries = 0;
    this.totalPayout = 0;
    this.totalDiff = 0;
    this.totalPool = 0;
  }

  getData() {
    return {
      nbEntries: this.nbEntries,
      totalPayout: this.totalPayout,
      totalDiff: this.totalDiff,
      totalPool: this.totalPool,
    };
  }

  getNbSaved() {
    return this.nbEntries;
  }

  added(payout, pool, diff) {
    this.addPayout(payout);
    this.addPool(pool);
    this.addDiff(diff);
  }

  addPayout(payout) {
    this.totalPayout += payout;
    this.totalPayout;
  }

  addPool(pool) {
    this.totalPool += pool;
    this.totalPool;
  }

  addDiff(diff) {
    this.totalDiff += diff;
    this.totalDiff;
  }
}

class Scraping {
  constructor() {
    this.lastLength = 0;
    this.loggedEntries = [];
    this.data = undefined;
  }

  async update(fn) {
    const filtered = this.data.filter((item) => item.isExpired);

    if (filtered.length > this.lastLength || this.lastLength === 0) {
      await fn(this.loggedEntries, filtered);

      this.data.forEach((item) => {
        if (this.loggedEntries.indexOf(item.roundId) < 0 && item.isExpired)
          this.loggedEntries.push(item.roundId);
      });

      this.lastLength = this.loggedEntries.length;
    }
  }

  setData(data) {
    this.data = data;
  }
}

module.exports = { TotalAverages, Prediction, Scraping };
