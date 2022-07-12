const bodyParser = require('body-parser');
//importing express, morgan, fs and path
const express = require('express'),
    morgan = require('morgan');
const uuid = require('uuid');
const app = express();

// logging with morgan (middleware)
app.use(morgan('common'));

app.use(bodyParser.json());

// defining the list of movies 
let movies = [
    {
        "title": "The Matrix",
        "directors": {
            "name": "The Wachowskis",
            "bio": "Lana (1965) and Lilly (1967) Wachowski also known as the Wachowskis are American film and television directors, writers and producers. The sisters are both trans women.",
            "image": "https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"
        },
        "summary": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
        "genre": {
            "name": "Sci-Fi",
            "description": "Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science. This genre often incorporates space, biology, energy, time, and any other observable science."
        },
        "image": "https://www.imdb.com/title/tt0133093/mediaviewer/rm525547776/?ref_=ext_shr_lnk",
        "year": 1999
    },
    {
        "title": "The Matrix Reloaded",
        "directors": {
            "name": "The Wachowskis",
            "bio": "Lana (1965) and Lilly (1967) Wachowski also known as the Wachowskis are American film and television directors, writers and producers. The sisters are both trans women.",
            "image": "https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"
        },
        "summary": "Freedom fighters Neo, Trinity and Morpheus continue to lead the revolt against the Machine Army, unleashing their arsenal of extraordinary skills and weaponry against the systematic forces of repression and exploitation.",
        "genre": {
            "name": "Sci-Fi",
            "description": "Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science. This genre often incorporates space, biology, energy, time, and any other observable science."
        },
        "image": "https://www.imdb.com/title/tt0234215/mediaviewer/rm2235971328/?ref_=ext_shr_lnk",
        "year": 2003
    },
    {
        "title": "The Matrix Revolutions",
        "directors": {
            "name": "The Wachowskis",
            "bio": "Lana (1965) and Lilly (1967) Wachowski also known as the Wachowskis are American film and television directors, writers and producers. The sisters are both trans women.",
            "image": "https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"
        },
        "summary": "The human city of Zion defends itself against the massive invasion of the machines as Neo fights to end the war at another front while also opposing the rogue Agent Smith.",
        "genre": {
            "name": "Sci-Fi",
            "description": "Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science. This genre often incorporates space, biology, energy, time, and any other observable science."
        },
        "image": "https://www.imdb.com/title/tt0242653/mediaviewer/rm1810127616/?ref_=ext_shr_lnk",
        "year": 2003
    },
    {
        "title": "The Matrix Resurrections",
        "directors": {
            "name": "Lana Wachowski (June 21, 1965)",
            "bio": "Lana Wachowski and her sister Lilly Wachowski, also known as the Wachowskis, are the duo behind such ground-breaking movies as The Matrix (1999) and Cloud Atlas (2012). Wachowski grew up in Chicago and formed a tight creative relationship with her sister Lilly. In 2012, during interviews for Cloud Atlas and in her acceptance speech for the Human Rights Campaign's Visibility Award, Lana spoke about her experience of being a transgender woman, sacrificing her much cherished anonymity out of a sense of responsibility. Lana is known to be extremely well-read, loves comic books and exploring ideas of imaginary worlds, and was inspired by Stanley Kubrick's 2001: A Space Odyssey (1968) in creating Cloud Atlas.",
            "image": "https://www.imdb.com/name/nm0905154/mediaviewer/rm3382618368?ref_=ext_shr_lnk"
        },
        "summary": "Return to a world of two realities: one, everyday life; the other, what lies behind it. To find out if his reality is a construct, to truly know himself, Mr. Anderson will have to choose to follow the white rabbit once more.",
        "genre": {
            "name": "Sci-Fi",
            "description": "Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science. This genre often incorporates space, biology, energy, time, and any other observable science."
        },
        "image": "https://www.imdb.com/title/tt10838180/mediaviewer/rm3704744193/?ref_=ext_shr_lnk",
        "year": 2021
    },
    {
        "title": "Bound",
        "directors": {
            "name": "The Wachowskis",
            "bio": "Lana (1965) and Lilly (1967) Wachowski also known as the Wachowskis are American film and television directors, writers and producers. The sisters are both trans women.",
            "image": "https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"
        },
        "summary": "Tough ex-con Corky and her lover Violet concoct a scheme to steal millions of stashed mob money and pin the blame on Violet's crooked boyfriend Caesar.",
        "genre": {
            "name": "Thriller",
            "description": "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
        },
        "image": "https://www.imdb.com/title/tt0115736/mediaviewer/rm3563591680/?ref_=ext_shr_lnk",
        "year": 1996
    },
    {
        "title": "Speed Racer",
        "directors": {
            "name": "The Wachowskis",
            "bio": "Lana (1965) and Lilly (1967) Wachowski also known as the Wachowskis are American film and television directors, writers and producers. The sisters are both trans women.",
            "image": "https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"
        },
        "summary": "Young driver Speed Racer aspires to be champion of the racing world with the help of his family and his high-tech Mach 5 automobile.",
        "genre": {
            "name": "Adventure",
            "description": "Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative. The predominant emphasis on violence and fighting in action films is the typical difference between the two genres."
        },
        "image": "https://www.imdb.com/title/tt0811080/mediaviewer/rm810431232/?ref_=ext_shr_lnk",
        "year": 2008
    },
    {
        "title": "Sense8 (Series)",
        "directors":{
            "name": "The Wachowskis",
            "bio": "Lana (1965) and Lilly (1967) Wachowski also known as the Wachowskis are American film and television directors, writers and producers. The sisters are both trans women.",
            "image": "https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"
        },
        "summary": "A group of people around the world are suddenly linked mentally, and must find a way to survive being hunted by those who see them as a threat to the world's order.",
        "genre": {
            "name": "Sci-Fi",
            "description": "Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science. This genre often incorporates space, biology, energy, time, and any other observable science."
        },
        "image": "https://www.imdb.com/title/tt2431438/mediaviewer/rm983118848/?ref_=ext_shr_lnk",
        "year": 2015
    },
    {
        "title": "Cloud Atlas",
        "directors": {
            "name": "The Wachowskis",
            "bio": "Lana (1965) and Lilly (1967) Wachowski also known as the Wachowskis are American film and television directors, writers and producers. The sisters are both trans women.",
            "image": "https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"
        },
        "summary": "An exploration of how the actions of individual lives impact one another in the past, present and future, as one soul is shaped from a killer into a hero, and an act of kindness ripples across centuries to inspire a revolution.",
        "genre": {
            "name": "Sci-Fi",
            "description": "Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science. This genre often incorporates space, biology, energy, time, and any other observable science."
        },
        "image": "https://www.imdb.com/title/tt1371111/mediaviewer/rm910339584/?ref_=ext_shr_lnk",
        "year": 2012
    },
    {
        "title": "Paris Is Burning",
        "directors": {
            "name": "Jennie Livingston (February 24, 1962)",
            "bio": "Jennie Livingston is a director and writer, known for Paris Is Burning (1990), Pose (2018) and Who's the Top? (2005). Livingston is the niece of Hollywood film director Alan J. Pakula, Step-cousin of writer-producer Jon Boorstin, actor Bob Boorstin and Anna Boorstin. She attended NYU/Tisch School of the Arts.",
            "image": "https://www.imdb.com/name/nm0515255/mediaviewer/rm1350167553?ref_=ext_shr_lnk"
        },
        "summary": "A chronicle of New York's drag scene in the 1980s, focusing on balls, voguing and the ambitions and dreams of those who gave the era its warmth and vitality.",
        "genre": {
            "name": "Documentary",
            "description": "A non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."
        },
        "image": "https://www.imdb.com/title/tt0100332/mediaviewer/rm2944047105/?ref_=ext_shr_lnk",
        "year": 1990
    },
    {
        "title": "There's Something in the Water",
        "directors": {
            "name": "Elliot Page (February 21, 1987)",
            "bio": "He is a Canadian actor and producer. Page has received various accolades, including an Oscar nomination, two BAFTA and Emmy nominations, and a Satellite Award. Page publicly came out as transgender in December 2020. In March 2021, he became the first openly trans man to appear on the cover of Time magazine.",
            "image": "https://www.imdb.com/name/nm0680983/mediaviewer/rm1295716609?ref_=ext_shr_lnk"
        },
        "summary": "The injustices and injuries caused by environmental racism in her home province, in this urgent documentary on Indigenous and African Nova Scotian women fighting to protect their communities, their land, and their futures.",
        "genre":{
            "name": "Documentary",
            "description": "A non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."
        },
        "image": "https://www.imdb.com/title/tt10864040/mediaviewer/rm459127553/?ref_=ext_shr_lnk",
        "year": 2019
    },
    {
        "title": "Boy I Am",
        "directors": {
            "name": "Sam Feder",
            "bio": "Sam Feder is a Peabody Award nominated film director. Cited by Indiewire as one of the exciting trans filmmakers shaking up Hollywood, Sam's films explore the intersection of visibility and politics along the lines of race, class, and gender. Sam's filmmaking practice models inclusion and equity in the industry.",
            "image": "https://www.imdb.com/name/nm2146703/mediaviewer/rm3954187777?ref_=ext_shr_lnk"
        },
        "summary": "While male transgender visibility has recently exploded in this country, conversations about trans issues in the lesbian community often run into resistance from the many queer women who view transitioning as a \"trend\" or as an anti-feminist act that taps into male privilege. Boy I Am is a feature-length documentary that begins to break down that barrier and promote dialogue about trans issues through a look at the experiences of three young transitioning FTMs in New York City--Nicco, Norie and Keegan--as they go through major junctures in their transitions, as well as through the voices of lesbians, activists and theorists who raise and address the questions that many people have but few openly discuss.",
        "genre": {
            "name": "Documentary",
            "description": "A non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."
        },
        "image": "https://www.imdb.com/title/tt1024954/mediaviewer/rm1789984768/?ref_=ext_shr_lnk",
        "year": 2006
    },
    {
        "title": "Kate Bornstein is a Queer & Pleasant Danger",
        "directors":  {
            "name": "Sam Feder",
            "bio": "Sam Feder is a Peabody Award nominated film director. Cited by Indiewire as one of the \"exciting trans filmmakers shaking up Hollywood\", Sam's films explore the intersection of visibility and politics along the lines of race, class, and gender. Sam's filmmaking practice models inclusion and equity in the industry.",
            "image": "https://www.imdb.com/name/nm2146703/mediaviewer/rm3954187777?ref_=ext_shr_lnk"
        },
        "summary": "For decades, performance artist and writer Kate Bornstein has been exploding binaries and deconstructing gender. And, her own identity. Trans-dyke. Reluctant polyamorist. Sadomasochist. Recovering Scientologist. Pioneering Gender Outlaw. Kate Bornstein Is a Queer and Pleasant Danger, joins her on her latest tour capturing rollicking public performances and painful personal revelations as it bears witness to Kate as a trailblazing artist theorist activist who inhabits a space between male and female with wit, style, and astonishing candor. By turns meditative and playful, the film invites us on a thought provoking journey through Kate's world to seek answers to some of life's biggest questions.",
        "genre": {
            "name": "Documentary",
            "description": "A non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."
        },
        "image": "https://images.squarespace-cdn.com/content/v1/5ecd45bd12463d63375d85e1/1591325108398-LTQA6662GHP9S3LLU4K7/KateBornsteinDVD_Cover.png",
        "year": 2014
    }
];

//list of users
let users = [
    {
        "id": 1,
        "name": "mrym.hanifi",
        "email": "mrym.hanifi@gmail.com",
        "password": "@1092Picab",
        "birth": 1992,
        "favoriteMovies": [
            "The Matrix",
            "Cloud Atlas"
        ]
    },
    {
        "id": 2,
        "name": "paniz.hekmat",
        "email": "paniz.hekmat68@gmail.com",
        "password": "234#BHm0",
        "birth": 1978,
        "favoriteMovies": [
            "Cloud Atlas",
            "Paris is burning",
            "Bound"
        ]
    },
    {
        "id": 3,
        "name": "alia_nikko",
        "email": "alia_nikko53@mail.de",
        "password": "sghl03nh%",
        "birth": 2000,
        "favoriteMovies": []
    }
];

// GET request to main page
app.get('/', (req, res) => {
    res.send('Welcome to my Movie App!');
});

// GET request to Movies page, returns list of all movies in JSON 
app.get('/movies', (req, res) => {
    res.json(movies);
});

// Get info about one movie by title
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('Movie not found!');
    }
})

// Get info about a genre by the name of the genre
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.genre.name === genreName).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('genre not found!');
    }
})

// Gets info about one movie by the director name
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.directors.name === directorName).directors;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('director not found!');
    }
})

// Gets info about one movie by the release year
app.get('/movies/:year', (req, res) => {
    res.json(movies.find((movie) => 
        {return movie.year === req.params.year}));
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
app.put('/users/:id', (req, res) => {
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
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array.`);
    } else {
        res.status(400).send('user not found!')
    }
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
    let movie =  movies.find((movie) => 
        {return movie.title === req.params.title});

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