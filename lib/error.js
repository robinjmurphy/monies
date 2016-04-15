'use strict';

const chalk = require('chalk');

module.exports = (err) => {
  let message = err.message;

  if (err.body && err.body.message) {
    message += `; ${err.body.message}`;
  }

  console.error(chalk.red(message));
  process.exit(1);
};
