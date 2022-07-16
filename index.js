// importing mongoose an reated models
const mongoose = require('mongoose');
const Models = require('./models.js');
// importing body-parser
const bodyParser = require('body-parser');
//importing express, morgan, fs and path
const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// integrating mongoose into the REST API
const Movies = Models.Movie;
const Users = Models.User;

// logging with morgan (middleware)
app.use(morgan('common'));

// GET request to main page
app.get('/', (req, res) => {
    res.send('Welcome to my Movie App!');
})

// GET request to Movies page, returns list of all movies in JSON 
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
app.get('/movies/:Title', (req, res) => {
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
app.get('/genre/:Name', (req, res) => {
    Genres.findOne({Name: req.params.Name})
    .then((genre) => {
        res.json(genre.Description);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Gets info about a director by director's name
app.get('/director/:Name', (req, res) => {
   Directors.findOne({Name: req.params.Name})
    .then((director) => {
        res.json(director);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});


// Add new user (registering)
app.post('/users', (req, res) => {
    Users.findOne({Username: req.body.Username})
    .then((user) => {
        if(user) {
            return res.status(400).send(req.body.Username + ' already exist ');
        } else {
            Users
            .create({
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthdate: req.body.Birthdate
            })
            .then((user) => {res.status(201).json(user)})
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

// GET all users
app.get('/users', (req, res) => {
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
app.get('/users/:Username', (req, res) => {
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
app.patch('/users/:Username', (req, res) => {
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
app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
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
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
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
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send(`User ${id} has been removed.`);
    } else {
        res.status(400).send('user not found!')
    }
});

//static serving the documentation file
app.use(express.static('public'));

//error handling
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

// app port listening
app.listen(8080, () => {
    console.log('listening on 8080.');
});