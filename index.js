// importing mongoose an reated models
const mongoose = require('mongoose');
/*
mongoose.connect('mongodb://localhost:27017/t-flix', { useNewUrlParser: true, useUnifiedTopology: true })
*/
// connecting to the database
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const Models = require('./models.js');
// importing body-parser
const bodyParser = require('body-parser');
//importing express, morgan, fs and path
const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');
const app = express();

// import swagger tools for documentation
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importing CORS
const cors = require('cors');
app.use(cors());

// importing express-validator
const { check, validationResult } = require('express-validator');

// Importing auth.js file
let auth = require('./auth')(app);

// Importing passport module and passport.js file
const passport = require('passport');
require('./passport');

// integrating mongoose into the REST API
const Movies = Models.Movie;
const Users = Models.User;

// logging with morgan (middleware)
app.use(morgan('common'));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "TFlix-API",
      description: "Movie API",
      contact: {
        name: "Maryam Hanifi",
      },
      servers: [
        {
          url: "http://localhost:8080",
          description: "Local server",
        },
        {
          url: "https://t-flix.herokuapp.com/",
          description: "Production server",
        },
      ],
    },
  },
  // ['.routes/*.js']
  apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// Create endpoint for documentation
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// GET request to main page
/**
 * @swagger
 * /:
 *  get:
 *    summary: Welcome page
 *    tags: [Welcome]
 *    responses:
 *      200:
 *        description: A successful response
 */
app.get('/', (req, res) => {
    res.send('Welcome to my Movie App!');
})

// GET request to Movies page, returns list of all movies in JSON 
// removed auth midlware [passport.authenticate('jwt', { session: false })] - React can access to the API

/**
 * @swagger
 * /movies:
 *    get:
 *      summary: Get list of all movies
 *      tags: [Movies]
 *      responses:
 *         200:
 *            description: A successful response
 *            content:
 *               application/json
 */
app.get('/movies', (req, res) => {
    Movies.find()
    .then((movies) => {
        res.status(201).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Get info about one movie by title
/**
 * @swagger
 * /movies/{Title}:
 *    get:
 *      summary: Get data about a single movie by title
 *      tags: [Movies]
 *      parameters:
 *          - name: Title
 *            description: Title of movie
 *            schema:
 *              type: string
 *      responses:
 *           200:
 *               description: A successful response
 */
app.get('/movies/:Title', passport.authenticate('jwt', { session: false}), (req, res) => {
    Movies.findOne({ Title: req.params.Title})
    .then((movie) => {
        res.json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(400).send('Error: ' + err);
    });
});

// Get info about a genre by the name of the genre
/**
 * @swagger
 * /genres/{Name}:
 *    get:
 *      summary: Return data about a genre (description) by name
 *      tags: [Movies]
 *      parameters:
 *        - name: Name
 *          description: Name of genre
 *          schema:
 *            type: string
 *      responses:
 *         200:
 *           description: A successful response
 */
app.get('/genre/:Name', passport.authenticate('jwt', { session: false}), (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.Name }).then((movie) => {
        if (movie) {
          res.status(200).json(movie.Genre);
        } else {
          res.status(400).send('Genre not found.');
        };
    });
});

// Gets info about a director by director's name
/**
 * @swagger
 * /directors/{Name}:
 *    get:
 *      summary: Return data about a director by name
 *      tags: [Movies]
 *      parameters:
 *         - name: Name
 *           description: Name of director
 *           schema:
 *             type: string
 *             format: string
 *      responses:
 *         200:
 *           description: A successful response
 */
app.get('/director/:Name', passport.authenticate('jwt', { session: false}), (req, res) => {
    Movies.findOne({'Director.Name': req.params.Name})
    .then((movie) => {
        res.status(200).json(movie.Director);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Add new user (registering)
// input validation for username and password (min 5ch, alphanumeric, not empty, email formatt)
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a user (register)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: The user was successfully created
 */
app.post('/users',
   [
    check('Username', 'Username is required').isLength({min:5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
   ], (req, res) => {
    // check validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }
    // hashes the password before storing it in db
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({Username: req.body.Username})
    .then((user) => {
        if(user) {
            return res.status(400).send(req.body.Username + ' already exist ');
        } else {
            Users
            .create({
                Username: req.body.Username,
                Password: hashedPassword,
                Email: req.body.Email,
                Birthdate: req.body.Birthdate
            })
            .then((user) => {res.status(201).json(user)})
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            });
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

// GET all users
/**
 * @swagger
 * /users:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      responses:
 *        200:
 *          description: A successful response
 */
app.get('/users', passport.authenticate('jwt', { session: false}), (req, res) => {
    Users.find()
    .then((users) => {
        res.status(201).json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// GET a user by username
/**
 * @swagger
 * /users/{Username}:
 *    get:
 *      summary: Get a user by username
 *      tags: [Users]
 *      parameters:
 *        - name: Username
 *          description: User username
 *          schema:
 *            type: string
 *            format: string
 *      responses:
 *        200:
 *          description: A successful response
 */
app.get('/users/:Username', passport.authenticate('jwt', { session: false}), (req, res) => {
    Users.findOne({Username: req.params.Username})
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Update username 
/**
 * @swagger
 * /users/{Username}:
 *  put:
 *    summary: Update a user's info, by username
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: Username
 *        schema:
 *          type: string
 *        required: true
 *        description: The user's username
 *    requestBody:
 *      required: true
 *    responses:
 *      200:
 *        description: The user was updated
 */
app.patch('/users/:Username', passport.authenticate('jwt', { session: false}), (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username}, {$set:
        {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthdate: req.body.Birthdate
        }
    },
    {new: true}, //makes sure the updated document is returned
    (err, updatedUser) => {
        if(err){
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

// Adds new movie to the user's favoriteMovies list
/**
 * @swagger
 * /users/{Username}/movies/{MovieID}:
 *   post:
 *     summary: Add a movie to a user's list of favorites by id
 *     tags: [Users]
 *     parameters:
 *       - name: Username
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's username
 *       - name: MovieID
 *         required: true
 *         description: The movie ID
 *
 *     responses:
 *       201:
 *         description: The movie was added
 */
app.post('/users/:UserID/movies/:MovieID', passport.authenticate('jwt', { session: false}), (req, res) => {
    Users.findOneAndUpdate({ _Id: req.params.UserID }, {
        $push: { FavoriteMovies: req.params.MovieID}
    },
    {new: true}, 
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

// Delete a movie from the user's favoriteMovies list
/**
 * @swagger
 * /users/{Username}/movies/{MovieID}:
 *   delete:
 *     summary: Remove a movie from a user's list of favorites by id
 *     tags: [Users]
 *     parameters:
 *       - name: Username
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's username
 *       - name: MovieID
 *         required: true
 *         description: The movie ID
 *     responses:
 *       202:
 *         description: The movie was deleted
 */
app.delete('/users/:UserID/movies/:MovieID', passport.authenticate('jwt', { session: false}), (req, res) => {
    Users.findOneAndUpdate({ _Id: req.params.UserID }, {
        $pull: { FavoriteMovies: req.params.MovieID}
    },
    {new: true}, 
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

// Delete a user from the users's array
/**
 * @swagger
 * /users/{Username}:
 *   delete:
 *     summary: Delete a user by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: Username
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's username
 *
 *     responses:
 *       202:
 *         description: The user was deleted
 */
app.delete('/users/:Username', passport.authenticate('jwt', { session: false}), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username})
    .then((user) => {
        if(!user) {
            res.status(400).sendStatus(req.params.Username + ' was not found');
        } else {
            res.status(200).send(req.params.Username + ' was removed.');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//static serving the documentation file
app.use(express.static('public'));

//error handling
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

// app port listening
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('listening on Port ' + port);
});