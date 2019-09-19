const express = require('express');
const fetch = require('node-fetch');

let app = express();

app.get('/', (req, res) => {
    fetch('https://randomfox.ca/floof/')
    .then(res => res.json()) // expecting a json response
    .then(json => {
        res.end(`
        <html>
            <head>
                <title>Random Fox</title>
            </head>
            <body>
                <img src="${json.image}"/>
                <a href="\">Next</a>
            </body>
        </html>
        `);
    })
    .catch(err => {
        console.error(err);
        res.status = 500;
        res.end('oops');
    })
});

app.listen(3000);