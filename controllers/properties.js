const { fetchProperties, fetchPropertyById } = require("../models/properties");

exports.getProperties = async (req, res, next) => {
    try {
        const properties = await fetchProperties();
        return res.status(200).send({ properties});
    } catch (err) {
        next(err);
    }
};

exports.getPropertyById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await fetchPropertyById(id);
        if( !property ) {
            return res.status(404).send({ msg: "Property not found." })
        } 
        res.status(200).send({ property });
    
    } catch (err) {
        next(err);
    }
};