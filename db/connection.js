const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });


const config = {};

if(ENV === "production") {
    config.connectionString = process.env.DATABASE_URL;
    config.max = 2;

}

const pool = new Pool(config);

if (ENV !== "test") {
    console.log(`ENV: ${ENV}`);
    pool.on('connect', () => {
        console.log('Connected to database');
    });
    pool.on('error', (err) => {
        console.error('Database pool error:', err);
    });
}

module.exports = pool;