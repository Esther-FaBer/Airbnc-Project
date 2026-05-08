const db = require("../db/connection");

exports.fetchProperties = async () =>{

    const { rows: properties } = await db.query(
        `SELECT 
            p.property_id,
            p.name AS property_name,
            p.location,
            p.price_per_night,
            CONCAT(u.first_name, ' ', u.surname) AS host,
            ROUND(AVG(r.rating), 1) AS avg_rating
        FROM properties p
        JOIN users u ON p.host_id = u.user_id
        LEFT JOIN reviews r ON p.property_id = r.property_id
        GROUP BY p.property_id, u.user_id`
    );
    
    return rows;
};


exports.fetchPropertyById =  async (property_id) => {

    const { rows: [property] } = await db.query(
        `SELECT 
            p.property_id,
            p.name,
            p.location,
            p.price_per_night,
            p.description,
            CONCAT(u.first_name, ' ', u.surname) AS host_name,
            u.avatar,
            ROUND(AVG(r.rating), 1) AS avg_rating
        FROM properties p
        JOIN users u ON p.host_id = u.user_id
        LEFT JOIN reviews r ON p.property_id = r.property_id
        WHERE p.property_id = $1
        GROUP BY p.property_id, u.user_id`,
        [property_id]
    );
    return property;
};

