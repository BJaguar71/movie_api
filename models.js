// importing mongoose
const mongoose = require('mongoose');

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
    Userame: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthdate: Date,
    FavoriteMovies: [{type: mongoose.Schema/mongoose.Types.ObjectId, ref: 'Movie'}]
});

