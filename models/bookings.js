const db = require("../db/connection");

exports.fetchBookingsByUserId = async (user_id) => {
    const { rows: bookings } = await db.query(
        `SELECT 
        bookings.booking_id,
        p.name AS property_name,
        bookings.check_in_date,
        bookings.check_out_date,
        bookings.created_at
        FROM bookings
        JOIN properties p ON bookings.property_id = p.property_id
        WHERE bookings.guest_id = $1`,
        [user_id]
    );
    return bookings;
};

exports.insertBooking = async (property_id, guest_id, check_in_date, check_out_date) => {
    const { rows: [booking] } = await db.query(
        `INSERT INTO bookings (property_id, guest_id, check_in_date, check_out_date)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [property_id, guest_id, check_in_date, check_out_date]
    );
    return booking;
};

exports.updateBooking = async (booking_id, updates) => {
    const { check_in_date, check_out_date } = updates;
    const { rows: [booking] } = await db.query(
        `UPDATE bookings
        SET check_in_date = COALESCE($1, check_in_date),
            check_out_date = COALESCE($2, check_out_date)
        WHERE booking_id = $3
        RETURNING *`,
        [check_in_date, check_out_date, booking_id]
    );
    return booking || null;
};

exports.removeBooking = async (booking_id) => {
    const { rows: [booking] } = await db.query(
        `DELETE FROM bookings
        WHERE booking_id = $1
        RETURNING *`,
        [booking_id]
    );
    return booking || null;
};