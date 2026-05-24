## AirBNC 🏡

A RESTful backend API serving property rental data, built with Node.js, Express, and PostgreSQL following MVC architecture

## Project Description

AirBNC is a backend server that powers a property rental platform — think Airbnb, but built from scratch. It exposes a set of REST API endpoints to manage properties, users, reviews, bookings, and favourites.
The project uses Express for routing and middleware, PostgreSQL as the relational database, and node-postgres (pg) to connect and query the database. The MVC pattern keeps the codebase clean and maintainable, separating routing, business logic, and data access into distinct layers.

## Requirements

- Node.js v18 or higher
- PostgreSQL v14 or higher running locally

## Installation

1. Clone the repository:

git clone https://github.com/your-username/airbnc.git
cd airbnc

2. Install dependencies:

npm install

3. Create the databases:

npm run create-dbs

## Environment Variables

Create the following .env files at the root of the project:

.env.test
    PGDATABASE=airbnc_test_01_test

.env.development
    PGDATABASE=airbnc_test_01_dev


For production credentials, please reach out to the project maintainer.

## Seeding

Seed each database using the following scripts:

Test: `npm run seed-test`
Development: `npm run seed-dev`
Production: `npm run seed-prod`


## API Endpoints






## Tests

integratiion testing is used for the endpoints. 

Run command: `npm test` to run all tests.



