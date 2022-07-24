// Defining the authentication key, this has to be the same key used in the JWTStrategy
const jwtSecret = 'your_jwt_secret';

// Importing JSON Web Token and passport
const jwt = require('jsonwebtoken'),
    passport = require('passport');

// Importing the local passport file
require('./passport');

