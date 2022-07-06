// defining the list of movies 
let movies = [
    {
        title: 'The Matrix',
        name: 'the Wachowskis',
        year: 1999
    },
    {
        title: 'The Matrix Reloaded',
        name: 'the Wachowskis',
        year: 2003
    },
    {
        title: 'The Matrix Revolutions',
        name: 'the Wachowskis',
        year: 2003,
    },
    {
        title: 'The Matrix Resurrections',
        name: 'Lena  Wachowski',
        year: 2021
    },
    {
        title: 'Bound',
        name: 'the Wachowskis',
        year: 1996
    },
    {
        title: 'Speed Racer',
        name: 'the Wachowskis',
        year: 2008
    },
    {
        title: 'Sense8 (Series)',
        name: 'the Wachowskis',
        year: '2015-2018'
    },
    {
        title: 'Cloud Atlas',
        name: 'the Wachowskis',
        year: 2012
    },
    {
        title: 'Jupiter Ascending',
        name: 'the Wachowskis',
        year: 2015
    },
    {
        title: 'Pose (Series)',
        name: [
            'Michaela Jaé Rodriguez',
            'Indya Moore',
            'Dominique Jackson',
            'Hailie Sahar',
            'Angelica Ross'
        ],
        year: '2018-2021'
    },
    {
        title: 'Paris Is Burning (Documentary)',
        name: [
            'Dorian Cory',
            'Venus Xtravaganza',
            'Octavia St. Laurent',
            'Angie Xtravaganza'
        ],
        year: 1990
    },
    {
        title: 'The Umbrella Academy (Series)',
        name: 'Elliot Page',
        year: '2019-present'
    },
    {
        title: 'Laverne Cox Presents: The T Word',
        name: 'Laverne Cox',
        year: 2014
    },
    {
        title: 'Grandma',
        name: 'Laverne Cox',
        year: 2015
    },
    {
        title: 'Freak Show',
        name: 'Laverne Cox',
        year: 2017
    },
    {
        title: 'Can You Keep a Secret?',
        name: 'Lav,erne Cox',
        year: 2019
    },
    {
        title: 'Charlie\'s Angels',
        name: 'Laverne Cox',
        year: 2019
    },
    {
        title: 'Bad Hair',
        name: 'Laverne Cox',
        year: 2020
    },
    {
        title: 'Promising Young Woman',
        name:'Laverne Cox',
        year: 2020
    },
    {
        title: 'Disclosure: Trans Lives on Screen (Documentary)',
        name: 'Laverne Cox',
        year: 2020
    },
    {
        title: 'Jolt',
        name: 'Laverne Cox',
        year: 2021
    },
    {
        title: 'Grand Street',
        name: 'Laverne Cox',
        year: 2014
    },
    {
        title: 'The Exhibitionists',
        name: 'Laverne Cox',
        year: 2012
    },
    {
        title: '36 Saints',
        name: 'Laverne Cox',
        year: 2013
    },
    {
        title: 'Carl[a]',
        name: 'Laverne Cox',
        year: 2011
    },
    {
        title: 'Musical Chairs',
        name: 'Loverne Cox',
        year: 2011
    },
    {
        title: 'Bronox Paradise',
        name: 'Loverne Cox',
        year: 2010
    },
    {
        title: 'Uncle Stephanie',
        name: 'Laverne Cox',
        year: 2009
    },
    {
        title: 'The King of Brooklyn',
        name: 'Laverne Cox',
        year: 2004
    },
    {
        title: 'Orange Is the New Black (Series)',
        name: 'Laverne Cox',
        year: '2013-2019'
    }
];

//importing express, morgan, fs and path
const express = require('express'),
    morgan = require('morgan');
const app = express();

// logging with morgan (middleware)
app.use(morgan('common'));

// GET request to main page
app.get('/', (req, res) => {
    res.send('Welcome to my Movie App!');
});

// GET request to Movies page, returns list of all movies in JSON 
app.use('/movies', (req, res) => {
    res.json(movies);
});

// Get info about one movie by title
app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) => {
        return movie.title === req.params.title
    }));
});

// Get info about one movie by the name of transgender actors/actresses/director
app.get('/movies/:name', (req, res) => {
    res.json(movies.find((movie) => {
        return movie.name === req.params.name
    }));
});

// Gets info about one movie by the release year
app.get('/movies/:year', (req, res) => {
    res.json(movies.find((movie) => {
        return movie.year === req.params.year
    }));
});

// Adds new movie to the list
app.post('/movies', (req, res) => {
    let newMovie =  req.body;

    if(!newMovie.title) {
        const message = 'Missing the title in the request body';
        res.status(400).send(message);
    } else {
        newMovie.id = uuid.v4();
        movies.push(newMovie);
        res.status(201).send(newMovie);
    }
});

//Deletes a movie by title
app.delete('/movies/:title', (req, res) => {
    let movie =  movies.find((movie) => {
        return movie.title === req.params.title
    });

    if (movie) {
        movies = movies.filter((obj) => {
            return obj.title !== req.params.title});
            res.status(201).send('Movie ' + req.params.title + ' was deleted.');
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
    console.log('The App is listening on port 8080.');
});