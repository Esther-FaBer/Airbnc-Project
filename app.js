const express = require("express")
const cors = require('cors');
const { getProperties, getPropertyById } = require("./controllers/properties");
const { getReviewsByPropertyId, postReviewByPropertyId, deleteReviewById, getReviewsByUserId, patchReview } = require("./controllers/reviews");
const { getUserById, postUser, patchUser, deleteUser } = require("./controllers/users");
const { getBookingsByUserId, postBooking, patchBooking, deleteBooking } = require("./controllers/bookings");
const { 
    handlePathNotFound, 
    handleBadRequests, 
    handleNotFound,
    handleCustomsErrors,
    handleServerErrors, 
 } = require("./errors.js");

const app = express();


app.use(cors());

app.use(express.json());

app.get("/api/properties", getProperties);
app.get("/api/properties/:id", getPropertyById);
app.get("/api/properties/:id/reviews", getReviewsByPropertyId);
app.post("/api/properties/:id/reviews", postReviewByPropertyId);

app.get("/api/users/:id/reviews", getReviewsByUserId);
app.patch("/api/reviews/:id", patchReview);
app.delete("/api/reviews/:id", deleteReviewById);

app.get("/api/users/:id", getUserById);
app.post("/api/users", postUser);
app.patch("/api/users/:id", patchUser);
app.delete("/api/users/:id", deleteUser)

app.get("/api/users/:id/bookings", getBookingsByUserId);
app.post("/api/properties/:id/bookings", postBooking);
app.patch("/api/bookings/:id", patchBooking);
app.delete("/api/bookings/:id", deleteBooking);

app.all(/.*/, handlePathNotFound);


app.use(handleBadRequests);
app.use(handleNotFound);
app.use(handleCustomsErrors);
app.use(handleServerErrors);


module.exports = app;
