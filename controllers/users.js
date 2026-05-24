const { fetchUserById, insertUser, updateUser, removeUser } = require("../models/users")

exports.getUserById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const user = await fetchUserById(id);
        if (!user) return res.status(404).send({ msg: "User not found." });
        res.status(200).send({ user });
    } catch (err) {
        next(err);
    }
}

exports.postUser = async (req, res, next) => {
    try {
        const { first_name, surname, email, phone_number, is_host, avatar } = req.body;
        if (!first_name || !surname || !email || is_host === undefined) {
            return res.status(400).send({ msg: "Bad request." });
        }
        const user = await insertUser(first_name, surname, email, phone_number, is_host, avatar);
        res.status(201).send({ user });
    } catch (err) {
        next(err);
    }
};

exports.patchUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await updateUser(id, req.body);
        if (!user) return res.status(404).send({ msg: "User not found." });
        res.status(200).send({ user });
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await removeUser(id);
        if (!user) return res.status(404).send({ msg: "User not found." });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};