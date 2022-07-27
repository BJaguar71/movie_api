// importing mongoose
const mongoose = require('mongoose');

// importing bcrypt Node.js'module
const bcrypt = require('bcrypt');

// defining schema for movies collection
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Summary: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String
    },
    Actors: [String],
    Image: String,
    Featured: Boolean
});

// defining schema for users collection
let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthdate: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

// creating models
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

// exporting the created models
module.exports.Movie = Movie;
module.exports.User = User;