const { createUserRef, getHostName, getHostId, formatReviewsData }  = require("../db/utils.js");

describe("Users: convert data from json in data for psql", () => {
    test("returns an empty object when passed an empty array", () => {
        expect(createUserRef([])).toEqual({});
        });
    test("assigns user first_name as key on ref object", () => {
        const users = [{ user_id: 1, first_name: "Alice" }];

        const ref = createUserRef(users);
        expect(ref.hasOwnProperty("Alice")).toBe(true); 
    });
     test("assigns users_id as value to user name property", () => {
        const users = [{ user_id: 1, first_name: "Alice" }];

        const ref = createUserRef(users);
        expect(ref["Alice"]).toBe(1); 
    });

    test("assigns multiple key value pairs", () => {
        const users = [
            { user_id: 1, first_name: "Alice" },
            { user_id: 2, first_name: "Bob" },
            { user_id: 3, first_name: "Emma" },
            { user_id: 4, first_name: "Frank" }
        ];

        const ref = createUserRef(users);
        expect(ref).toEqual({
            "Alice": 1,
            "Bob": 2,
            "Emma": 3,
            "Frank": 4
        });
    });

});

describe("Properties: manipulate Host_name from users table", () => {
    test("returns an empty string when passed an empty array", () => {
        expect(getHostName([])).toEqual("");
    });
    test("takes first_name and surname and concatenates both", () => {
        const host_names = [
            { first_name: "Alice", surname: "Johnson" },
            { first_name: "Bob", surname: "Smith" },
        ];

        expect(getHostName(host_names)).toEqual([
            "Alice Johnson",
            "Bob Smith"
        ]);
    });
    test("if first_name or surname is missing, return the present", () => {
        const host_names = [
            { first_name: "", surname: "Johnson"},
            { first_name: "Bob", surname: ""},
        ];
        expect(getHostName(host_names)).toEqual(["Johnson", "Bob"]);
    });
    test("if first_name and surname is missing, return Unknown Host", () => {
        const host_names = [
            { first_name: "", surname: ""},
        ];
        expect(getHostName(host_names)).toEqual(["Unknown Host"]);
    })
});

describe("assigns user_id to host_id", () => {
    test("returns empty object when passed empty array", () => {
        expect(getHostId([])).toEqual({});
    });
    test("assigns full name as key and user_id as value", () => {
        const users = [{ user_id: 1, first_name: "Alice", surname: "Johnson" }];
        expect(getHostId(users)).toEqual({ "Alice Johnson": 1 });
    });
});

describe("formatReviewData", () => {
    test("return an empty array when passed empty arrays", () => {
        expect(formatReviewsData([], {})).toEqual([]);
    });
    test("returns an array", () => {
        const reviews = [
            { property_name: "Cosy Cottage", guest_name: "Alice Johnson", rating: 4, comment: "Great stay!", created_at: "2024-01-10" }
        ];
        const propertiesRef = { "Cosy Cottage": 1 };
        const userRef = { "Alice Johnson": 1 };

        expect(Array.isArray(formatReviewsData(reviews, propertiesRef, userRef))).toBe(true);
    });
    test("returns correctly formatted single review", () => {
        const reviews = [
            { property_name: "Cosy Cottage", guest_name: "Alice Johnson", rating: 4, comment: "Great stay!", created_at: "2024-01-10" }
        ];
        const propertiesRef = { "Cosy Cottage": 1 };
        const userRef = { "Alice Johnson": 1 };

        expect(formatReviewsData(reviews, propertiesRef, userRef)).toEqual([
            [1, 1, 4, "Great stay!", "2024-01-10"]
        ]);
    });

    test("returns correctly formatted multiple reviews", () => {
        const reviews = [
            { property_name: "Cosy Cottage", guest_name: "Alice Johnson", rating: 4, comment: "Great stay!", created_at: "2024-01-10" },
            { property_name: "Beach House", guest_name: "Bob Smith", rating: 5, comment: "Loved it!", created_at: "2024-02-15" }
        ];
        const propertiesRef = { "Cosy Cottage": 1, "Beach House": 2 };
        const userRef = { "Alice Johnson": 1, "Bob Smith": 2 };

        expect(formatReviewsData(reviews, propertiesRef, userRef)).toEqual([
            [1, 1, 4, "Great stay!", "2024-01-10"],
            [2, 2, 5, "Loved it!", "2024-02-15"]
        ]);
    });

    test("does not mutate the original reviews array", () => {
        const reviews = [
            { property_name: "Cosy Cottage", guest_name: "Alice Johnson", rating: 4, comment: "Great stay!", created_at: "2024-01-10" }
        ];
        const propertiesRef = { "Cosy Cottage": 1 };
        const userRef = { "Alice Johnson": 1 };
        const reviewsCopy = [...reviews];

        formatReviewsData(reviews, propertiesRef, userRef);
        expect(reviews).toEqual(reviewsCopy);
    });
});

