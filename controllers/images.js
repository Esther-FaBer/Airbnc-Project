const { fetchImagesByPropertyId, insertImage, removeImage } = require("../models/images");

exports.getImagesByPropertyId = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(400).send({ msg: "Bad request." });
        }
        const images = await fetchImagesByPropertyId(id);
        if (images.length === 0) {
            return res.status(404).send({ msg: "No images found." });
        }
        res.status(200).send({ images });
    } catch (err) {
        next(err);
    }
};

exports.postImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { image_url, alt_text } = req.body;
        if (isNaN(Number(id))) {
            return res.status(400).send({ msg: "Bad request." });
        }
        if (!image_url || !alt_text) {
            return res.status(400).send({ msg: "Bad request." });
        }
        const image = await insertImage(id, image_url, alt_text);
        if (!image) {
            return res.status(404).send({ msg: "Property not found." });
        }
        res.status(201).send({ image });
    } catch (err) {
        next(err);
    }
};

exports.deleteImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(400).send({ msg: "Bad request." });
        }
        const image = await removeImage(id);
        if (!image) {
            return res.status(404).send({ msg: "Image not found." });
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};