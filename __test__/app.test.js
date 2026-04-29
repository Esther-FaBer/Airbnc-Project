const request = require ("supertest");
const app = require("../app.js");
const seed = require("../db/seed.js");
const { propertiesData, propertyTypesData, reviewsData, usersData } = require("../db/data/test")
const db = require("../db/connection");

beforeEach(async () => {
    await seed(propertyTypesData, usersData, propertiesData, reviewsData);
});

afterAll(() => {
    db.end();
});

describe("app", () => {
    describe("GET/api/properties", () => {
        test("responds with status of 200", async() => {

            const response = await request(app).get("/api/properties").expect(200)
        });
        test("responds with an array on the key of properties", async () => {

            const { body } = await request(app).get("/api/properties")
            expect(Array.isArray(body.properties)).toBe(true);
        });
        test("responds with an array of properties with a correct length", async () => {
            const { body } = await request(app).get("/api/properties");
            expect(body.properties.length).toBe(propertiesData.length);
        });
        test("responds with properties objects having the correct structure", async () => {
            const { body } = await request(app).get("/api/properties");
            body.properties.forEach(property => {
                expect(property).toHaveProperty("property_id");
                expect(property).toHaveProperty("property_name");
                expect(property).toHaveProperty("location");
                expect(property).toHaveProperty("price_per_night");
                expect(property).toHaveProperty("host");
            });
            
        });

    });
    describe("GET/api/properties/{id}", () => {
        test("should respond with status 200", async () => {
            await request(app).get("/api/properties/2").expect(200);

        });
        test("the property object should contain 7 elements", async () => {
            const { 
                body: { property }, 
             } = await request(app).get("/api/properties/1").expect(200);

             expect(Object.keys(property)).toHaveLength(7);
        });
        test("property object has a property_id, name, location, price_per_night, description, host_name", async () => {
            const { 
                body: { property }, 
                } = await request(app).get("/api/properties/1");

                expect(property).toHaveProperty("property_id", 1);
                expect(property).toHaveProperty("name", "Modern Apartment in City Center");
                expect(property).toHaveProperty("location", "London, UK");
                expect(property).toHaveProperty("price_per_night", "120");//price comes back as string
                expect(property).toHaveProperty("description", "Description of Modern Apartment in City Center.");
                expect(property).toHaveProperty("host_name", "Alice Johnson");
        });
        test("400: Bad request", async () => {
            const response = await request(app)
                .get("/api/properties/cat")
                .expect(400);
                expect(response.body.msg).toBe("Bad request.");
        });
        test("404: property not found", async () => {
            const response = await request(app).get("api/properties/99999").expect(404);
            expect(response.body.msg).toBe("Property not found.")        
        });
    });
    describe("GET/api/properties/{id}/reviews", () => {
        test("should respond with status 200 and the right properties", async () => {
            const { body } = await request(app)
            .get("/api/properties/1/reviews")
            .expect(200);
            body.reviews.forEach((review) => {
                expect(review).toHaveProperty("review_id");
                expect(review).toHaveProperty("comment");
                expect(review).toHaveProperty("rating");
                expect(review).toHaveProperty("created_at");
                expect(review).toHaveProperty("guest");
                expect(review).toHaveProperty("avatar");
            });
        });
        test("should return 400 bad request msg for incorrect property_id as input", async() => {
            const response = await request(app).get("/api/properties/cat/reviews").expect(400)
            expect(response.body.msg).toBe("Bad request.")
        });
        
    });
    describe("POST/api/properties/{id}/reviews", () => {
        test("should respond with status 201", async () => {
            const postReview = {
             guest_id: 2,
             rating: 4,
             comment: "Comment about Modern Apartment in City Center"
            }
            await request(app)
            .post("/api/properties/3/reviews")
            .send(postReview)
            .expect(201);
        });
        test("should respond with newly inserted review with a fresh id", async () => {
            const postReview = {
             guest_id: 2,
             rating: 4,
             comment: "Comment about Modern Apartment in City Center"
            }

            const { body } = await request(app)
                .post("/api/properties/3/reviews")
                .send(postReview)
                .expect(201);

            expect(body.review).toMatchObject(postReview);
            expect(body.review).toHaveProperty("review_id");
            expect(body.review).toHaveProperty("created_at");
            expect(body.review).toHaveProperty("property_id", 3);
        });
        test("should respond with 400 for missing fields", async () => {
            const postReview = {
                rating: 4
            };

            const { body } = await request(app)
                .post("/api/properties/1/reviews")
                .send(postReview)
                .expect(400);

            expect(body.msg).toBe("Bad request.");
        });
        test("404: property does not exist", async () => {
            const postReview = { guest_id: 2, rating: 4, comment: "Great!"};
            (await request(app).post("api/properties/99999/reviews")).send(postReview).expect(404);
        })

    });
    describe("DELETE/api/reviews/{id}", () => {
        test("should remove a review and return status 204", async () => {
            await request(app)
            .delete("/api/reviews/1")
            .expect(204);
            
        });
        test("should return 404 if no valid review id", async () => {
            const response = await request(app)
                .delete("/api/reviews/0")
                .expect(404);
                expect(response.body.msg).toBe("Review not found.");
        });
    });
    });
