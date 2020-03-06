const fetch = require('node-fetch');
const express = require('express');

let app = express();


app.get('/', (req, res) => {

    fetch(' https://restapiabasicauthe-sandbox.mxapps.io/api/books', {
            headers: { 'Authorization': 'Basic YWRtaW46aHZnWDhLbFZFYQ==' }
        })
        .then(data => data.json())
        .then(json => {
            console.log(json);
            res.end(`<h1>data been delivered ... check your console</h1>`);
        })
        .catch(err => {
            console.log(`oops there is error ${err}`);
            res.end('ooooops');
        });

});

app.listen(3000, () => console.log(`listen to the port....`));