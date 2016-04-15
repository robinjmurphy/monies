'use strict';

const async = require('async');
const chalk = require('chalk');

const client = require('../client');
const token = require('../token');
const error = require('../error');

module.exports = () => {
  async.waterfall([
    function getAccountId(done) {
      client.getAccountId(token, done);
    },
    function getBalance(accountId, done) {
      client.getBalance(token, accountId, done);
    }
  ], (err, balance) => {
    if (err) return error(err);

    console.log(chalk.green(`£${balance}`));
  });
};
