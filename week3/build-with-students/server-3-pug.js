const express = require('express');
const fetch = require('node-fetch');

let app = express();
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    fetch('https://randomfox.ca/floof/')
    .then(res => res.json()) // expecting a json response
    .then(json => {
        res.render('index', { imgURL: json.image })
    })
    .catch(err => {
        console.error(err);
        res.status = 500;
        res.end('oops');
    })
} );

app.listen(3000);