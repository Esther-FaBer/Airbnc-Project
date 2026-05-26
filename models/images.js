const db = require("../db/connection");

exports.fetchImagesByPropertyId = async (property_id) => {
    const { rows: images } = await db.query(
        `SELECT 
        image_id,
        property_id,
        image_url,
        alt_text
        FROM images
        WHERE property_id = $1`,
        [property_id]
    );
    return images;
};

exports.insertImage = async (property_id, image_url, alt_text) => {
    const { rows: [image] } = await db.query(
        `INSERT INTO images (property_id, image_url, alt_text)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [property_id, image_url, alt_text]
    );
    return image;
};

exports.removeImage = async (image_id) => {
    const { rows: [image] } = await db.query(
        `DELETE FROM images
        WHERE image_id = $1
        RETURNING *`,
        [image_id]
    );
    return image || null;
};