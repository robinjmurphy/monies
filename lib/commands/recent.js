'use strict';

const _ = require('lodash');
const async = require('async');
const chalk = require('chalk');
const moment = require('moment');
const columnify = require('columnify');

const client = require('../client');
const token = require('../token');
const error = require('../error');

function print(transactions) {
  const data = transactions.map((t) => {
    const credit = t.amount > 0;
    const color = credit ? 'green' : 'red';
    const prefix = credit ? '+' : '-';
    const amount = (Math.sqrt(t.amount * t.amount) / 100).toFixed(2);

    return {
      amount: chalk[color](`${prefix}£${amount}`),
      emoji: _.get(t, 'merchant.emoji') || '💳',
      description: _.get(t, 'merchant.name', t.description),
      time: chalk.gray(moment(t.created).fromNow())
    };
  });

  const colunns = columnify(data, {
    showHeaders: false,
    columnSplitter: '  '
  });

  console.log(colunns);
}

module.exports = () => {
  const since = moment().subtract(72, 'hours');

  async.waterfall([
    function getAccountId(done) {
      client.getAccountId(token, done);
    },
    function getBalance(accountId, done) {
      client.getTransactions(token, accountId, since.format(), done);
    }
  ], (err, transactions) => {
    if (err) return error(err);

    print(transactions);
  });
};
