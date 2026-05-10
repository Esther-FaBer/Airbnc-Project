function createUserRef(users) {
    const ref = {};
    
    if (users.length === 0) return ref;

    users.forEach((user)=> {
        ref[`${user.first_name} ${user.surname}`] = user.user_id;
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

module.exports = { createUserRef, createPropertyRef, createFullName };