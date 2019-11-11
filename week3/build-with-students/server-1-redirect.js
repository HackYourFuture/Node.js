const express = require('express');
const fetch = require('node-fetch');

let app = express();

app.get('/', (req, res ) => {
    fetch('https://randomfox.ca/floof/')
    .then(res => res.json()) // expecting a json response
    .then(json => {
        res.redirect(json.image);
    })
    .catch(err => {
        console.error(err);
        res.end('Ooops!');
    });
});

app.listen(3000);