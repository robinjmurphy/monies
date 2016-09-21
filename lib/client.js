'use strict';

const _ = require('lodash');

const client = require('flashheart').createClient({
  defaults: {
    baseUrl: 'https://api.monzo.com',
    qsStringifyOptions: {
      arrayFormat: 'brackets'
    }
  }
});

const auth = (token) => {
  return {
    authorization: `Bearer ${token}`
  };
};

module.exports.getAccountId = (token, cb) => {
  const opts = {
    headers: auth(token)
  };

  client.get('/accounts', opts, (err, data) => {
    if (err) return cb(err);

    cb(null, _.get(data, 'accounts[0].id'));
  });
};

module.exports.getBalance = (token, accountId, cb) => {
  const opts = {
    headers: auth(token),
    qs: {
      account_id: accountId
    }
  };

  client.get('/balance', opts, (err, data) => {
    if (err) return cb(err);

    const balance = (data.balance / 100).toFixed(2);

    cb(null, balance);
  });
};

module.exports.getTransactions = (token, accountId, since, cb) => {
  const opts = {
    headers: auth(token),
    qs: {
      since: since,
      account_id: accountId,
      expand: ['merchant']
    }
  };

  client.get('/transactions', opts, (err, data) => {
    if (err) return cb(err);

    cb(null, data.transactions.reverse());
  });
};
