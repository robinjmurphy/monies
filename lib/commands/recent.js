'use strict';

const R = require('ramda');
const async = require('async');
const chalk = require('chalk');
const moment = require('moment');

const client = require('../client');
const token = require('../token');
const error = require('../error');

function pad(string, length) {
  while (string.length < length) {
    string += ' ';
  }

  return string;
}

function longest(data, key) {
  return R.pipe(
    R.clone,
    R.sort((a, b) => a[key].length - b[key].length),
    R.reverse,
    R.head,
    R.prop(key),
    R.length
  )(data);
}

function print(transactions) {
  const data = transactions.map(t => {
    const credit = t.amount > 0;
    const color = credit ? 'green' : 'red';
    const prefix = credit ? '+' : '-';
    const amount = (Math.sqrt(t.amount * t.amount) / 100).toFixed(2);
    const emoji = R.pathOr('💳', ['merchant', 'emoji'])(t);
    const description = R.pipe(
      R.path(['merchant', 'name']),
      R.defaultTo(t.description)
    )(t);
    return {
      amount: chalk[color](`${prefix}£${amount}`),
      description: `${emoji}  ${description}`,
      time: chalk.gray(moment(t.created).fromNow())
    };
  });

  if (data.length === 0) return;

  const longestAmount = longest(data, 'amount');
  const longestDescription = longest(data, 'description');

  data.forEach(d => {
    console.log(
      pad(d.amount, longestAmount),
      pad(d.description, longestDescription),
      d.time
    );
  });
}

module.exports = days => {
  days = Number(days) || 3;
  const since = moment().subtract(days, 'days');

  async.waterfall(
    [
      function getAccountId(done) {
        client.getAccountId(token, done);
      },
      function getBalance(accountId, done) {
        client.getTransactions(token, accountId, since.format(), done);
      }
    ],
    (err, transactions) => {
      if (err) return error(err);

      print(transactions);
    }
  );
};
