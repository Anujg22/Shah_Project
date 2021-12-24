const dbConfig = require('./db_config');
const moment = require('moment');

const connection = {
  ...dbConfig,
  timezone: 'UTC',
  typeCast: function (field, next) {
    if (field.type == 'TIMESTAMP') {
      const time = field.string();
      return time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : null;
    }
    if (field.type == 'DATE') {
      const time = field.string();
      return time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : null;
    }
    if (field.type == 'DATETIME') {
      const time = field.string();
      return time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : null;
    }
    return next();
  },
};

// const debug = process.env.NODE_ENV == 'debug';
const db = require('knex')({
  client: 'pg',
  connection: connection,
  pool: {
    min: 0,
    max: 100,
    // acquireTimeoutMillis: 30000,
    // createTimeoutMillis: 1500,
    // createRetryIntervalMillis: 500,
    propagateCreateError: false, // <- default is true, set to false
  }
  // debug,
});

module.exports = db;
