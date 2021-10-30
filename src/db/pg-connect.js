const _ = require('lodash');
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: 5432
});

const customQuery = query => pool.query(query);

module.exports = {
  customQuery
};
