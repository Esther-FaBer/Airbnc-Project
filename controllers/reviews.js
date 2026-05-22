const { fetchReviewsByPropertyId, insertReview, deleteReviewById } = require("../models/reviews");

exports.getReviewsByPropertyId = async (req, res, next) => {
    const property_id = Number(req.params.id);

    if(isNaN(property_id)) {
        return res.status(400).send({ msg: "Bad request."})
    }
    
    const reviews = await fetchReviewsByPropertyId(property_id);

    if (reviews.length === 0) {
        return res.status(404).send({ msg: "404 not found." });
        }
    
    res.status(200).send({ reviews });
};

exports.postReviewByPropertyId = async (req, res, next) => {
    try {
        const property_id = Number(req.params.id);
        const { guest_id, rating, comment } = req.body;

        if (isNaN(property_id)) {
            return res.status(400).send({ msg: "Bad request." });
        }
        if (!guest_id || !rating || !comment) {
            return res.status(400).send({ msg: "Bad request." });
        }

        const review = await insertReview(property_id, guest_id, rating, comment);

        if (!review) {
            return res.status(404).send({ msg: "Property not found." });
        }

        res.status(201).send({ review });
    } catch (err) {
        next(err);
    }
};

exports.deleteReviewById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await deleteReviewById(id);

        if (!review) {
            return res.status(404).send({ msg: "Review not found." });
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

