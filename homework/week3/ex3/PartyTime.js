const fetch = require('node-fetch');
const express = require('express');

const app = express();

const url = 'https://reservation100-sandbox.mxapps.io/rest-doc/api/swagger.json';
// const url = 'https://reservation100-sandbox.mxapps.io/rest-doc/api#/reservations/post_reservations';

// https://reservation100-sandbox.mxapps.io/rest-doc/api#/reservations/post_reservations
app.get('/', (req, res) => {

    fetch(url, { headers: { 'Content-Type': 'application/json' } })
        .then(data => data.json())
        .then(json => {
            console.log(json);
            res.end(`<h1>The reservation for the biggest party  ... check your console</h1>`);
        })
        .catch(err => {
            res.end(`oops there is ${err}`);
        });

});

// defulte reservations
let sendReservations = {
    name: "Naji",
    numberOfPeople: 3
};

//Post with JSON
fetch(url, {
    method: 'post',
    body: JSON.stringify(sendReservations),
    headers: { 'Content-Type': 'application/json' },
});

//Post with params
app.post('/reservations/:name/:numberOfPeople', (req, res) => {
    const name = req.params;

    sendReservations = {
        name: name.name,
        numberOfPeople: name.numberOfPeople
    }

    res.json(sendReservations);
    res.end();

});

app.listen(3000, () => console.log(`listen to the port....`));