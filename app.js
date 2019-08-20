const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore.js');

const app = express();

app.use(morgan('common'));


app.listen(8000, () => {
    console.log("Express server is listening on port 8000");
});

app.get('/apps', (req, res) => {
    results = playstore;
    return res
            .json(results)
});