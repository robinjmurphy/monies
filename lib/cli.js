#! /usr/bin/env node

'use strict';

const program = require('commander');
const version = require('../package').version;

const balance = require('./commands/balance');
const recent = require('./commands/recent');
const token = require('./token');

if (!token) {
  console.error('Please export your MONZO_TOKEN 🔑');
  console.error('See: https://github.com/robinjmurphy/monies#usage');
  process.exit(1);
}

program.version(version);

program.command('balance')
  .description('Show your current balance')
  .action(balance);

program.command('recent [days]')
  .description('List your recent transactions')
  .alias('ls')
  .action(function(days) {recent(days)});

program.parse(process.argv);

if (program.args.length === 0) {
  balance();
}
