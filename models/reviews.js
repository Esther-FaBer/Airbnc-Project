const db = require("../db/connection");

exports.fetchReviewsByPropertyId = async (property_id) => {
    
    const { rows: reviews } = await db.query(
        `SELECT review_id, 
        comment, 
        rating, 
        reviews.created_at, 
        CONCAT(first_name, ' ', surname) AS guest,
        avatar
        FROM reviews
        JOIN users ON reviews.guest_id = users.user_id
        WHERE property_id = $1`,
        [property_id]
    );
    return reviews;
};

exports.insertReview = async (property_id, guest_id, rating, comment) => {
    const { rows } = await db.query (
        `INSERT INTO reviews (property_id, guest_id, rating, comment) 
        VALUES ($1, $2, $3, $4)
        RETURNING review_id, property_id, guest_id, rating, comment, created_at;`,
        [property_id, guest_id, rating, comment]
    );

    return rows[0];
};

exports.deleteReviewById = async(review_id) => {
    const { rows } = await db.query(
        `DELETE FROM reviews 
        WHERE review_id = $1
        RETURNING *`,
        [review_id]
    );
   
    if (rows.length === 0) return null;
    
    return rows[0];
};

exports.fetchReviewsByUserId = async (user_id) => {
    const { rows: reviews } = await db.query(
        `SELECT review_id,
        comment,
        rating,
        reviews.created_at,
        CONCAT(u.first_name, ' ', u.surname) AS guest,
        p.name AS property_name
        FROM reviews
        JOIN users u ON reviews.guest_id = u.user_id
        JOIN properties p ON reviews.property_id = p.property_id
        WHERE reviews.guest_id = $1`,
        [user_id]
    );
    return reviews;
};

exports.updateReview = async (review_id, updates) => {
    const { rating, comment } = updates;
    const { rows: [review] } = await db.query(
        `UPDATE reviews
        SET rating = COALESCE($1, rating),
            comment = COALESCE($2, comment)
        WHERE review_id = $3
        RETURNING *`,
        [rating, comment, review_id]
    );
    return review || null;
};