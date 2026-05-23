exports.handlePathNotFound = (req, res, next) => {
    res.status(404).send({msg:"Not found."});
};

exports.handleBadRequests = (err, req, res, next) => {
    const codes = ["23502", "22P02"];
    if (codes.includes(err.code)) {
        res.status(400).send({ msg: "Bad request." });
    } else {
        next(err);
    }
};

exports.handleNotFound = (err, req, res, next) => {
    if (err.code === "23503") {
        res.status(404).send({ msg: "Property not found." });
    } else {
        next(err);
    }
};

exports.handleCustomsErrors = (err, req, res, next) => {
    if(err.status){
    res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
};

exports.handleServerErrors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "Server Error."})
};