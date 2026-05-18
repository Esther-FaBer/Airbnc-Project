const db = require("./connection");

async function dropTables() {
    await db.query(`DROP TABLE IF EXISTS properties_amenities CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS amenities CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS images CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS favourites CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS bookings CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS reviews CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS properties CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS users CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS property_types CASCADE;`);
}

module.exports = dropTables;