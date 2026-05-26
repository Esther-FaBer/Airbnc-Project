const { fetchBookingsByUserId, insertBooking, updateBooking, removeBooking } = require("../models/bookings");

exports.getBookingsByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(400).send({ msg: "Bad request." });
        }
        const bookings = await fetchBookingsByUserId(id);
        if (bookings.length === 0) {
            return res.status(404).send({ msg: "No bookings found." });
        }
        res.status(200).send({ bookings });
    } catch (err) {
        next(err);
    }
};

exports.postBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { guest_id, check_in_date, check_out_date } = req.body;
        if (isNaN(Number(id))) {
            return res.status(400).send({ msg: "Bad request." });
        }
        if (!guest_id || !check_in_date || !check_out_date) {
            return res.status(400).send({ msg: "Bad request." });
        }
        const booking = await insertBooking(id, guest_id, check_in_date, check_out_date);
        if (!booking) {
            return res.status(404).send({ msg: "Property not found." });
        }
        res.status(201).send({ booking });
    } catch (err) {
        next(err);
    }
};

exports.patchBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(400).send({ msg: "Bad request." });
        }
        const booking = await updateBooking(id, req.body);
        if (!booking) {
            return res.status(404).send({ msg: "Booking not found." });
        }
        res.status(200).send({ booking });
    } catch (err) {
        next(err);
    }
};

exports.deleteBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(400).send({ msg: "Bad request." });
        }
        const booking = await removeBooking(id);
        if (!booking) {
            return res.status(404).send({ msg: "Booking not found." });
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};