const { fetchFavouritesByUserId, insertFavourite, removeFavourite } = require("../models/favourites");

exports.getFavouritesByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(400).send({ msg: "Bad request." });
        }
        const favourites = await fetchFavouritesByUserId(id);
        if (favourites.length === 0) {
            return res.status(404).send({ msg: "No favourites found." });
        }
        res.status(200).send({ favourites });
    } catch (err) {
        next(err);
    }
};

exports.postFavourite = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { guest_id } = req.body;
        if (isNaN(Number(id))) {
            return res.status(400).send({ msg: "Bad request." });
        }
        if (!guest_id) {
            return res.status(400).send({ msg: "Bad request." });
        }
        const favourite = await insertFavourite(guest_id, id);
        if (!favourite) {
            return res.status(404).send({ msg: "Property not found." });
        }
        res.status(201).send({ favourite });
    } catch (err) {
        next(err);
    }
};

exports.deleteFavourite = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(400).send({ msg: "Bad request." });
        }
        const favourite = await removeFavourite(id);
        if (!favourite) {
            return res.status(404).send({ msg: "Favourite not found." });
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};