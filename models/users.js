const db = require("../db/connection");

exports.fetchUserById =  async (user_id) => {

    const { rows: [user] } = await db.query(
        `SELECT user_id, first_name, surname, email, phone_number, is_host, avatar, created_at
        FROM users
        WHERE user_id = $1`,
        [user_id]
    );
    return user || null;
};

exports.insertUser = async (first_name, surname, email, phone_number, is_host, avatar) => {
    const { rows: [user] } = await db.query(
        `INSERT INTO users (first_name, surname, email, phone_number, is_host, avatar)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [first_name, surname, email, phone_number, is_host, avatar]
    );
    return user;
};

exports.updateUser = async (user_id, updates) => {
    const { first_name, surname, email, phone_number, avatar } = updates;
    const { rows: [user] } = await db.query(
        `UPDATE users
        SET first_name = COALESCE($1, first_name),
            surname = COALESCE($2, surname),
            email = COALESCE($3, email),
            phone_number = COALESCE($4, phone_number),
            avatar = COALESCE($5, avatar)
        WHERE user_id = $6
        RETURNING *`,
        [first_name, surname, email, phone_number, avatar, user_id]
    );
    return user || null;
};

exports.removeUser = async (user_id) => {
    const { rows: [user] } = await db.query(
        `DELETE FROM users
        WHERE user_id = $1
        RETURNING *`,
        [user_id]
    );
    return user || null;
};