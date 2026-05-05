const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });


console.log(`ENV: ${ENV}`);


const config = {};

if(ENV === "production") {
    config.connectionString = process.env.DATABASE_URL;
    config.max = 2;
    console.log(`Connecting to production DB...`);
    console.log(`DATABASE_URL set: ${!!process.env.DATABASE_URL}`);
}

const pool = new Pool(config);

pool.on('connect', () => {
    console.log('Connected to database');
});

pool.on('error', (err) => {
    console.error('Database pool error:', err);
});

module.exports = pool;