const db = require("./connection");
const format = require("pg-format");
const dropTables = require("./drops");
const { createUserRef, createPropertyRef } = require("./utils")


async function seed(property_types, users, properties, reviews, bookings, favourites) {

    //drop existing table
    await dropTables();
       
    //create property_types table
    await db.query(`CREATE TABLE property_types (
        property_type VARCHAR(50) NOT NULL PRIMARY KEY,
        description TEXT NOT NULL
        );`);
    
    //create users table
    await db.query(`CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(40) NOT NULL,
        surname VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        phone_number VARCHAR(50),
        is_host BOOLEAN NOT NULL,
        avatar TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
    
    //create properties table
    await db.query(`CREATE TABLE properties(
        property_id SERIAL PRIMARY KEY,
        host_id INT NOT NULL REFERENCES users(user_id),
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        property_type VARCHAR(50) NOT NULL REFERENCES property_types(property_type),
        price_per_night DECIMAL NOT NULL CHECK (price_per_night > 0),
        description TEXT
        );`);

    //create reviews table
    await db.query(`CREATE TABLE reviews(
        review_id SERIAL PRIMARY KEY,
        property_id INT NOT NULL REFERENCES properties(property_id),
        guest_id INT REFERENCES users(user_id),
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);

    //create users bookings table
    await db.query(`CREATE TABLE bookings(
        booking_id SERIAL PRIMARY KEY,
        property_id INT NOT NULL REFERENCES properties(property_id),
        guest_id INT  REFERENCES users(user_id),
        check_in_date DATE NOT NULL,
        check_out_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT
        );`);

    //create users favourites table
    await db.query(`CREATE TABLE favourites(
        favourite_id SERIAL PRIMARY KEY,
        guest_id INT NOT NULL REFERENCES users(user_id),
        property_id INT NOT NULL REFERENCES properties(property_id)
        );`);

    //create users images table
    await db.query(`CREATE TABLE images(
        image_id SERIAL PRIMARY KEY,
        property_id INT NOT NULL REFERENCES properties(property_id),
        image_url VARCHAR(100) NOT NULL,
        alt_text VARCHAR(100) NOT NULL
        )`);
    
    //create users properties amenities table
    await db.query(`CREATE TABLE properties_amenities(
        property_amenities SERIAL PRIMARY KEY,
        property_id INT NOT NULL REFERENCES properties(property_id),
        amenity_slug VARCHAR(100)
        );`)

    //create users amenities table
    await db.query(`CREATE TABLE amenities(
        amenity VARCHAR(100) PRIMARY KEY
        );`)

    //insert data property_types
    const formatedPropertyTypeData =  property_types.map(({ property_type, description }) => [
                property_type, description])
    
    await db.query(
        format(
            `INSERT INTO property_types (property_type, description) VALUES %L`, 
            formatedPropertyTypeData             
        ));
    //insert data users
    const { rows: insertedUsers } = await db.query(
        format(
            `INSERT INTO users (
             first_name, surname, email, phone_number, is_host, avatar, created_at) VALUES %L RETURNING *`,
             users.map(({ first_name, surname, email, phone_number, is_host, avatar, created_at }) => [
                first_name, surname, email, phone_number, is_host, avatar, created_at])
        ));
        const userRef = createUserRef(insertedUsers);
 
    
    //insert data properties
    const formatedPropertiesData =  properties.map(
        ( { host_name, name, location, property_type, price_per_night, description}) => [
                userRef[host_name],
                name,
                location, 
                property_type, 
                price_per_night, 
                description
    ]);

    const { rows: insertedProperties } = await db.query(
        format(
            `INSERT INTO properties (host_id, name, location, property_type, price_per_night, description) VALUES %L RETURNING *`,
             formatedPropertiesData
        ));

        const propertiesRef = createPropertyRef(insertedProperties);
 
    //insert data reviews
    const formatedReviewsData = reviews.map(
        ({ property_name, guest_name, rating, comment, created_at })  => [
            propertiesRef[property_name], 
            userRef[guest_name], 
            rating, 
            comment, 
            created_at
            ]);

    await db.query(
        format(
            `INSERT INTO reviews (property_id, guest_id, rating, comment, created_at) VALUES %L RETURNING *`,
             formatedReviewsData
        ));
        

}

module.exports = seed;