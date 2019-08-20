const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore.js');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {

    const sort = req.query.sort;
    const genres = req.query.genres;

    let results = playstore;

    if (genres) {
        if( genres === 'Action' ||
            genres === 'Puzzle' || 
            genres === 'Strategy' ||
            genres === 'Casual' ||
            genres === 'Arcade' ||
            genres === 'Card'
            ) { 
            results = results.filter(app => app.Genres.toLowerCase() === genres.toLowerCase());
        }
        else {
            return res
                    .status(400)
                    .send({error: 'Genre must be one of "Action", "Puzzle", "Strategy", "Casual", "Arcade", or "Card".'})
        }
    }

    if (sort) {
        if (sort === 'app') {
            results = results
                        .sort((a, b) => a.App.localeCompare(b.App));
            return res
                    .json(results)
        }
        else if (sort === 'rating') {
            results = results
                        .sort((a, b) => b.Rating - a.Rating)
            return res
                    .json(results)
        }
        else {
            return res
                    .status(400)
                    .send({error: 'Please sort by either "rating" or "app".'})
        }

    }

    return res
            .json(results)
});


app.listen(8000, () => {
    console.log("Express server is listening on port 8000");
});