const express = require('express');
const fetch = require('node-fetch');
var mustacheExpress = require('mustache-express');

let app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views-mustache');

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