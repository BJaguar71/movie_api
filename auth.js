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

/* POST login. */
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', { session: false}, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, { session: false}, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token}); // It returns the token
            });
        })(req, res);
    });
}