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
        "Title": "The Matrix",
        "Director": {
            "Name": "The Wachowskis",
            "Bio": "Lana (1965) and Lilly (1967) Wachowski also known as the Wachowskis are American Film and television directors, writers and producers. The sisters are both trans women.",
            "Image": "https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"
        },
        "Summary": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
        "Genre": {
            "Name": "Sci-Fi",
            "Description": "Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science. This genre often incorporates space, biology, energy, time, and any other observable science."
        },
        "Image": "https://www.imdb.com/title/tt0133093/mediaviewer/rm525547776/?ref_=ext_shr_lnk",
        "Year": 1999,
        "Featured" : true
    },
    {
        "Title": "The Matrix Reloaded",
        "Director": {
            "Name": "The Wachowskis",
            "Bio": "Lana (1965) and Lilly (1967) Wachowski also known as the Wachowskis are American film and television directors, writers and producers. The sisters are both trans women.",
            "Image": "https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"
        },
        "Summary": "Freedom fighters Neo, Trinity and Morpheus continue to lead the revolt against the Machine Army, unleashing their arsenal of extraordinary skills and weaponry against the systematic forces of repression and exploitation.",
        "Genre": {
            "Name": "Sci-Fi",
            "Description": "Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science. This genre often incorporates space, biology, energy, time, and any other observable science."
        },
        "Image": "https://www.imdb.com/title/tt0234215/mediaviewer/rm2235971328/?ref_=ext_shr_lnk",
        "Year": 2003,
        "Featured" : false
    },
    {
        "Title": "The Matrix Revolutions",
        "Director": {
            "Name": "The Wachowskis",
            "Bio": "Lana (1965) and Lilly (1967) Wachowski also known as the Wachowskis are American film and television directors, writers and producers. The sisters are both trans women.",
            "Image": "https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"
        },
        "Summary": "The human city of Zion defends itself against the massive invasion of the machines as Neo fights to end the war at another front while also opposing the rogue Agent Smith.",
        "Genre": {
            "Name": "Sci-Fi",
            "Description": "Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science. This genre often incorporates space, biology, energy, time, and any other observable science."
        },
        "Image": "https://www.imdb.com/title/tt0242653/mediaviewer/rm1810127616/?ref_=ext_shr_lnk",
        "Year": 2003,
        "Featured" : false
    },
    {
        "Title": "The Matrix Resurrections",
        "Director": {
            "Name": "Lana Wachowski (June 21, 1965)",
            "Bio": "Lana Wachowski and her sister Lilly Wachowski, also known as the Wachowskis, are the duo behind such ground-breaking movies as The Matrix (1999) and Cloud Atlas (2012). Wachowski grew up in Chicago and formed a tight creative relationship with her sister Lilly. In 2012, during interviews for Cloud Atlas and in her acceptance speech for the Human Rights Campaign's Visibility Award, Lana spoke about her experience of being a transgender woman, sacrificing her much cherished anonymity out of a sense of responsibility. Lana is known to be extremely well-read, loves comic books and exploring ideas of imaginary worlds, and was inspired by Stanley Kubrick's 2001: A Space Odyssey (1968) in creating Cloud Atlas.",
            "Image": "https://www.imdb.com/name/nm0905154/mediaviewer/rm3382618368?ref_=ext_shr_lnk"
        },
        "Summary": "Return to a world of two realities: one, everyday life; the other, what lies behind it. To find out if his reality is a construct, to truly know himself, Mr. Anderson will have to choose to follow the white rabbit once more.",
        "Genre": {
            "Name": "Sci-Fi",
            "Description": "Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science. This genre often incorporates space, biology, energy, time, and any other observable science."
        },
        "Image": "https://www.imdb.com/title/tt10838180/mediaviewer/rm3704744193/?ref_=ext_shr_lnk",
        "Year": 2021,
        "Featured" : false
    },
    {
        "Title": "Bound",
        "Director": {
            "Name": "The Wachowskis",
            "Bio": "Lana (1965) and Lilly (1967) Wachowski also known as the Wachowskis are American film and television directors, writers and producers. The sisters are both trans women.",
            "Image": "https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"
        },
        "Summary": "Tough ex-con Corky and her lover Violet concoct a scheme to steal millions of stashed mob money and pin the blame on Violet's crooked boyfriend Caesar.",
        "Genre": {
            "Name": "Thriller",
            "Description": "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
        },
        "Image": "https://www.imdb.com/title/tt0115736/mediaviewer/rm3563591680/?ref_=ext_shr_lnk",
        "Year": 1996, 
        "Featured" : false
    },
    {
        "Title": "Speed Racer",
        "Director": {
            "Name": "The Wachowskis",
            "Bio": "Lana (1965) and Lilly (1967) Wachowski also known as the Wachowskis are American film and television directors, writers and producers. The sisters are both trans women.",
            "Image": "https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"
        },
        "Summary": "Young driver Speed Racer aspires to be champion of the racing world with the help of his family and his high-tech Mach 5 automobile.",
        "Genre": {
            "Name": "Adventure",
            "Description": "Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative. The predominant emphasis on violence and fighting in action films is the typical difference between the two genres."
        },
        "Image": "https://www.imdb.com/title/tt0811080/mediaviewer/rm810431232/?ref_=ext_shr_lnk",
        "Year": 2008,
        "Featured" : false
    },
    {
        "Title": "Sense8 (Series)",
        "Director":{
            "Name": "The Wachowskis",
            "Bio": "Lana (1965) and Lilly (1967) Wachowski also known as the Wachowskis are American film and television directors, writers and producers. The sisters are both trans women.",
            "Image": "https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"
        },
        "Summary": "A group of people around the world are suddenly linked mentally, and must find a way to survive being hunted by those who see them as a threat to the world's order.",
        "Genre": {
            "Name": "Sci-Fi",
            "Description": "Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science. This genre often incorporates space, biology, energy, time, and any other observable science."
        },
        "Image": "https://www.imdb.com/title/tt2431438/mediaviewer/rm983118848/?ref_=ext_shr_lnk",
        "Year": 2015,
        "Featured" : false
    },
    {
        "Title": "Cloud Atlas",
        "Director": {
            "Name": "The Wachowskis",
            "Bio": "Lana (1965) and Lilly (1967) Wachowski also known as the Wachowskis are American film and television directors, writers and producers. The sisters are both trans women.",
            "Image": "https://www.indiewire.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-25-at-10.23.06-AM.png"
        },
        "Summary": "An exploration of how the actions of individual lives impact one another in the past, present and future, as one soul is shaped from a killer into a hero, and an act of kindness ripples across centuries to inspire a revolution.",
        "Genre": {
            "Name": "Sci-Fi",
            "Description": "Films are defined by a combination of imaginative speculation and a scientific or technological premise, making use of the changes and trajectory of technology and science. This genre often incorporates space, biology, energy, time, and any other observable science."
        },
        "Image": "https://www.imdb.com/title/tt1371111/mediaviewer/rm910339584/?ref_=ext_shr_lnk",
        "Year": 2012,
        "Featured" : false
    },
    {
        "Title": "Paris Is Burning",
        "Director": {
            "Name": "Jennie Livingston (February 24, 1962)",
            "Bio": "Jennie Livingston is a director and writer, known for Paris Is Burning (1990), Pose (2018) and Who's the Top? (2005). Livingston is the niece of Hollywood film director Alan J. Pakula, Step-cousin of writer-producer Jon Boorstin, actor Bob Boorstin and Anna Boorstin. She attended NYU/Tisch School of the Arts.",
            "Image": "https://www.imdb.com/name/nm0515255/mediaviewer/rm1350167553?ref_=ext_shr_lnk"
        },
        "Summary": "A chronicle of New York's drag scene in the 1980s, focusing on balls, voguing and the ambitions and dreams of those who gave the era its warmth and vitality.",
        "Genre": {
            "Name": "Documentary",
            "Description": "A non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."
        },
        "Image": "https://www.imdb.com/title/tt0100332/mediaviewer/rm2944047105/?ref_=ext_shr_lnk",
        "Year": 1990,
        "Featured" : true
    },
    {
        "Title": "There's Something in the Water",
        "Director": {
            "Name": "Elliot Page (February 21, 1987)",
            "Bio": "He is a Canadian actor and producer. Page has received various accolades, including an Oscar nomination, two BAFTA and Emmy nominations, and a Satellite Award. Page publicly came out as transgender in December 2020. In March 2021, he became the first openly trans man to appear on the cover of Time magazine.",
            "Image": "https://www.imdb.com/name/nm0680983/mediaviewer/rm1295716609?ref_=ext_shr_lnk"
        },
        "Summary": "The injustices and injuries caused by environmental racism in her home province, in this urgent documentary on Indigenous and African Nova Scotian women fighting to protect their communities, their land, and their futures.",
        "Genre":{
            "Name": "Documentary",
            "Description": "A non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."
        },
        "Image": "https://www.imdb.com/title/tt10864040/mediaviewer/rm459127553/?ref_=ext_shr_lnk",
        "Year": 2019,
        "Featured" : true
    },
    {
        "Title": "Boy I Am",
        "Director": {
            "Name": "Sam Feder",
            "Bio": "Sam Feder is a Peabody Award nominated film director. Cited by Indiewire as one of the exciting trans filmmakers shaking up Hollywood, Sam's films explore the intersection of visibility and politics along the lines of race, class, and gender. Sam's filmmaking practice models inclusion and equity in the industry.",
            "Image": "https://www.imdb.com/name/nm2146703/mediaviewer/rm3954187777?ref_=ext_shr_lnk"
        },
        "Summary": "While male transgender visibility has recently exploded in this country, conversations about trans issues in the lesbian community often run into resistance from the many queer women who view transitioning as a \"trend\" or as an anti-feminist act that taps into male privilege. Boy I Am is a feature-length documentary that begins to break down that barrier and promote dialogue about trans issues through a look at the experiences of three young transitioning FTMs in New York City--Nicco, Norie and Keegan--as they go through major junctures in their transitions, as well as through the voices of lesbians, activists and theorists who raise and address the questions that many people have but few openly discuss.",
        "Genre": {
            "Name": "Documentary",
            "Description": "A non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."
        },
        "Image": "https://www.imdb.com/title/tt1024954/mediaviewer/rm1789984768/?ref_=ext_shr_lnk",
        "Year": 2006,
        "Featured" : true
    },
    {
        "Title": "Kate Bornstein is a Queer & Pleasant Danger",
        "Director":  {
            "Name": "Sam Feder",
            "Bio": "Sam Feder is a Peabody Award nominated film director. Cited by Indiewire as one of the \"exciting trans filmmakers shaking up Hollywood\", Sam's films explore the intersection of visibility and politics along the lines of race, class, and gender. Sam's filmmaking practice models inclusion and equity in the industry.",
            "Image": "https://www.imdb.com/name/nm2146703/mediaviewer/rm3954187777?ref_=ext_shr_lnk"
        },
        "Summary": "For decades, performance artist and writer Kate Bornstein has been exploding binaries and deconstructing gender. And, her own identity. Trans-dyke. Reluctant polyamorist. Sadomasochist. Recovering Scientologist. Pioneering Gender Outlaw. Kate Bornstein Is a Queer and Pleasant Danger, joins her on her latest tour capturing rollicking public performances and painful personal revelations as it bears witness to Kate as a trailblazing artist theorist activist who inhabits a space between male and female with wit, style, and astonishing candor. By turns meditative and playful, the film invites us on a thought provoking journey through Kate's world to seek answers to some of life's biggest questions.",
        "Genre": {
            "Name": "Documentary",
            "Description": "A non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."
        },
        "Image": "https://images.squarespace-cdn.com/content/v1/5ecd45bd12463d63375d85e1/1591325108398-LTQA6662GHP9S3LLU4K7/KateBornsteinDVD_Cover.png",
        "Year": 2014,
        "Featured" : true
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
        "favoriteMovies": []
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
        "favoriteMovies": [
            "the Matrix",
            "Paris is burning"
        ]
    }
];

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