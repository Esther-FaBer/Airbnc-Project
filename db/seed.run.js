const seed = require("./seed");
const db = require("./connection");
const { propertyTypesData, usersData, propertiesData, reviewsData, bookingsData, favouritesData, imagesData } = require("./data/test");


seed(propertyTypesData, usersData, propertiesData, reviewsData, bookingsData, favouritesData, imagesData)
    .then(() => {
        console.log("Seed completed!");
        db.end();
    })
    .catch((err) => {
        console.error("Seed failed:" , err);
        db.end();
        process.exit(1);
    });