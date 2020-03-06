const express = require('express');
const fetch = require('node-fetch');

let app = express();

app.get('/', (req, res) => {

    fetch('http://api.icndb.com/jokes/random')
        .then(data => data.json())
        .then(json => {
            res.end(`<h1>${json.value.joke}</h1>`);
        })
        .catch(err => {
            res.end('oops there is ${err}');
        });

});

app.listen(3000, () => console.log(`listen to the port....`));