function createUserRef(users) {
    const ref = {};
    
    if (users.length === 0) return ref;

    users.forEach((user)=> {
        ref[createFullName(user.first_name, user.surname)] = user.user_id;
    });
    return ref;
}

function createPropertyRef(properties) {
    const ref= {};

    if (properties.length === 0) return ref;

    properties.forEach((property) => {
        ref[property.name] = property.property_id;
    });
    return ref;
}

function createFullName(first_name, surname) {
    if(!first_name && !surname) return "Unknown Host";
    return[first_name, surname].filter(Boolean).join(" ");
}

function getHostName(hosts) {
    if (hosts.length === 0) return "";
    return hosts.map((host) => createFullName(host.first_name, host.surname));
}

function formatReviewsData(reviews, propertiesRef, userRef) {
    return reviews.map(({ property_name, guest_name, rating, comment, created_at }) => [
        propertiesRef[property_name],
        userRef[guest_name],
        rating,
        comment,
        created_at
    ]);
}

function calcAverageRating(reviews, property_id) {
    const propertyReviews = reviews.filter((review) => review.property_id === property_id);

    if (propertyReviews.length === 0) return null;

    const total = propertyReviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / propertyReviews.length) * 10) / 10;
}

module.exports = { createUserRef, createPropertyRef, createFullName, getHostName, formatReviewsData, calcAverageRating };