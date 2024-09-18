const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'secours',
    password: 'Antonio0108Andria',
    port: 5432,
});

module.exports = pool;
