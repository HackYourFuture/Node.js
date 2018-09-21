'use strict';

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const manipulate = require('./manipulate');

const app = express();
const port = 3030;

app.use(bodyParser.json());

app.get('/todos/:id(\\d+)', (request, response) => {
    const index = request.params.id;
    manipulate.runTheFunction('list', index, response);
});

app.delete('/todos', (request, response) => {
    manipulate.reset();
    response
        .status(301)
        .json({ result: "your to-do list is cleaned" });
});

//this is used for adding new tasks into todos.json file.
//this was not included to homework but I did it.
app.post('/todos', (request, response) => {
    manipulate.runTheFunction('add', request.body.task);
    response
        .status(201)
        .json({ result: "your task is added!" });

});

app.post('/todos/:id(\\d+)/done', (request, response) => {
    const index = request.params.id;
    manipulate.runTheFunction('mark', index, true);
    response
        .status(201)
        .json({ result: "it is marked as done!" });

});

app.delete('/todos/:id(\\d+)/done', (request, response) => {
    const index = request.params.id;
    manipulate.runTheFunction('mark', index, false);
    response
        .status(301)
        .json({ result: "it is marked as undone!" });
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
