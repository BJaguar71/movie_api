// Defining the authentication key, this has to be the same key used in the JWTStrategy
const jwtSecret = 'your_jwt_secret';

// Importing JSON Web Token and passport
const jwt = require('jsonwebtoken'),
    passport = require('passport');

// Importing the local passport file
require('./passport');

// Generating the JWT token based on the username and password
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, // The username that's encoding in the JWT
        expiresIn: '7d', // Specifing the token to expire in 7 days
        algorithm: 'HS256' // The algorithm is used to sign or encode the values of the JWT
    });
}

