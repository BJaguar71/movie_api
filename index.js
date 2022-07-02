// imported express 
const express = require('express');
const app = express();

// defining the list of movies 
let movies = [
    {
        movie: 'The Matrix',
        name: 'the Wachowskis',
        year: 1999
    },
    {
        movie: 'The Matrix Reloaded',
        name: 'the Wachowskis',
        year: 2003
    },
    {
        movie: 'The Matrix Revolutions',
        name: 'the Wachowskis',
        year: 2003,
    },
    {
        movie: 'The Matrix Resurrections',
        name: 'Lena  Wachowski',
        year: 2021
    },
    {
        movie: 'Bound',
        name: 'the Wachowskis',
        year: 1996
    },
    {
        movie: 'Speed Racer',
        name: 'the Wachowskis',
        year: 2008
    },
    {
        movie: 'Sense8 (Series)',
        name: 'the Wachowskis',
        year: '2015-2018'
    },
    {
        movie: 'Cloud Atlas',
        name: 'the Wachowskis',
        year: 2012
    },
    {
        movie: 'Jupiter Ascending',
        name: 'the Wachowskis',
        year: 2015
    },
    {
        movie: 'Pose (Series)',
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
        movie: 'Paris Is Burning (Documentary)',
        name: [
            'Dorian Cory',
            'Venus Xtravaganza',
            'Octavia St. Laurent',
            'Angie Xtravaganza'
        ],
        year: 1990
    },
    {
        movie: 'The Umbrella Academy (Series)',
        name: 'Elliot Page',
        year: '2019-present'
    },
    {
        movie: 'Laverne Cox Presents: The T Word',
        name: 'Laverne Cox',
        year: 2014
    },
    {
        movie: 'Grandma',
        name: 'Laverne Cox',
        year: 2015
    },
    {
        movie: 'Freak Show',
        name: 'Laverne Cox',
        year: 2017
    },
    {
        movie: 'Can You Keep a Secret?',
        name: 'Lav,erne Cox',
        year: 2019
    },
    {
        movie: 'Charlie\'s Angels',
        name: 'Laverne Cox',
        year: 2019
    },
    {
        movie: 'Bad Hair',
        name: 'Laverne Cox',
        year: 2020
    },
    {
        movie: 'Promising Young Woman',
        name:'Laverne Cox',
        year: 2020
    },
    {
        movie: 'Disclosure: Trans Lives on Screen (Documentary)',
        name: 'Laverne Cox',
        year: 2020
    },
    {
        movie: 'Jolt',
        name: 'Laverne Cox',
        year: 2021
    },
    {
        movie: 'Grand Street',
        name: 'Laverne Cox',
        year: 2014
    },
    {
        movie: 'The Exhibitionists',
        name: 'Laverne Cox',
        year: 2012
    },
    {
        movie: '36 Saints',
        name: 'Laverne Cox',
        year: 2013
    },
    {
        movie: 'Carl[a]',
        name: 'Laverne Cox',
        year: 2011
    },
    {
        movie: 'Musical Chairs',
        name: 'Loverne Cox',
        year: 2011
    },
    {
        movie: 'Bronox Paradise',
        name: 'Loverne Cox',
        year: 2010
    },
    {
        movie: 'Uncle Stephanie',
        name: 'Laverne Cox',
        year: 2009
    },
    {
        movie: 'The King of Brooklyn',
        name: 'Laverne Cox',
        year: 2004
    },
    {
        movie: 'Orange Is the New Black (Series)',
        name: 'Laverne Cox',
        year: '2013-2019'
    }
]
