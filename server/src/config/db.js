const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'Pass14361436',
  host: 'localhost',
  port: 5432,
  database: 'notes_db',
});

module.exports = pool;
