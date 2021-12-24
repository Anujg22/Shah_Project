
// const winstonConfig = require('../../config/winston-config');

// let defaultLogger = winstonConfig.defaultLogger;

const Pool = require ('pg').Pool
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "Anujgupta@22091998",
  database: "shah"
})

const dbConfig = require('../../config/db_config');


dbConfig.connectionLimit = 5;


// const pool = new Pool(dbConfig);


// pool.getConnection(function (err, connection) {
//   if (err) throw err;

//   connection.query('SELECT 1 + 1 AS solution', function (
//     error,
//     results,
//     fields,
//   ) {
//     if (results.length && results[0].solution === 2) {
//       console.log(`MySql Connected: ${process.env.DATABASE_NAME}.`);
//       defaultLogger.info('MySql Connected!...');
//       defaultLogger.info(
//         `Database: ${dbConfig.database}, Host: ${dbConfig.host}`,
//       );
//     }

//     connection.release();

//     if (error) throw error;

//   });
// });


pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});
let query = (sql, values = []) => {
  defaultLogger.info(`Executing query: sql:${sql}, values: ${values}`);
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        defaultLogger.error('Database connection failed', err);
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            defaultLogger.error(
              `Query @sql: ${sql} failed with @error: ${err}`,
            );
            defaultLogger.error(sql, values);
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

module.exports = pool;
// module.exports = transaction;
