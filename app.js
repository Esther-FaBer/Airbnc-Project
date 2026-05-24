const express = require("express")
const cors = require('cors');
const { getProperties, getPropertyById } = require("./controllers/properties");
const { getReviewsByPropertyId, postReviewByPropertyId, deleteReviewById } = require("./controllers/reviews");
const { 
    handlePathNotFound, 
    handleBadRequests, 
    handleNotFound,
    handleCustomsErrors,
    handleServerErrors, 
 } = require("./errors.js");
const { getUsers, getUserById, postUser, patchUser, DeleteUSer } = require("./controllers/users");


const app = express();


app.use(cors());

app.use(express.json());

app.get("/api/properties", getProperties);
app.get("/api/properties/:id", getPropertyById);
app.get("/api/properties/:id/reviews", getReviewsByPropertyId);
app.post("/api/properties/:id/reviews", postReviewByPropertyId);

app.delete("/api/reviews/:id", deleteReviewById);

app.get("/api/users/:id", getUserById);
app.post("/api/users", postUser);
app.patch("/api/users/:id", patchUser);
app.delete("/api/users/:id", deleteUser)

app.all("/all", handlePathNotFound);


app.use(handleBadRequests);
app.use(handleNotFound);
app.use(handleCustomsErrors);
app.use(handleServerErrors);


module.exports = app;
