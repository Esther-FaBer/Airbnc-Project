const db = require("../db/connection");

exports.fetchFavouritesByUserId = async (user_id) => {
    const { rows: favourites } = await db.query(
        `SELECT 
        favourites.favourite_id,
        p.name AS property_name,
        p.location,
        p.price_per_night,
        CONCAT(u.first_name, ' ', u.surname) AS host
        FROM favourites
        JOIN properties p ON favourites.property_id = p.property_id
        JOIN users u ON p.host_id = u.user_id
        WHERE favourites.guest_id = $1`,
        [user_id]
    );
    return favourites;
};

exports.insertFavourite = async (guest_id, property_id) => {
    const { rows: [favourite] } = await db.query(
        `INSERT INTO favourites (guest_id, property_id)
        VALUES ($1, $2)
        RETURNING *`,
        [guest_id, property_id]
    );
    return favourite;
};

exports.removeFavourite = async (favourite_id) => {
    const { rows: [favourite] } = await db.query(
        `DELETE FROM favourites
        WHERE favourite_id = $1
        RETURNING *`,
        [favourite_id]
    );
    return favourite || null;
};