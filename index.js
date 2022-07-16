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
    res.status(200).json(movies);
})

// Get info about one movie by title
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('Movie not found!');
    }
})

// Get info about a genre by the name of the genre
app.get('/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('genre not found!');
    }
})

// Gets info about a director by director's name
app.get('/director/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('director not found!');
    }
})

// Add new user
app.post('/users', (req, res) => {
    const newUser = req.body; 

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else { 
        res.status(400).send('name is missing'); 
    }
})

// Update user 
app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body; 

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('user not found!')
    }
})

// Adds new movie to the user's favoriteMovies list
app.post('/users/:id/favoriteMovies/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array.`);
    } else {
        res.status(400).send('user not found!')
    }
});

// Delete a movie from the user's favoriteMovies list
app.delete('/users/:id/favoriteMovies/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been deleted from user ${id}'s array.`);
    } else {
        res.status(400).send('user not found!')
    }
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