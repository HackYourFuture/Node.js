'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const manipulate = require('./manipulate');
const app = express();
const port = 3030;

app.use(bodyParser.json());

app.get('/todos', (request, response) => {
    manipulate.list(response);
});

app.get('/todos/:id(\\d+)', (request, response) => {
    const index = request.params.id - 1;
    manipulate.list(response, index);
});

app.post('/todos', (request, response) => {
    manipulate.add(request.body.task, response);
});

app.post('/todos/:id(\\d+)/done', (request, response) => {
    const index = request.params.id - 1;
    manipulate.mark(index, true, response);
});

app.delete('/todos', (request, response) => {
    manipulate.reset(response);
});

app.delete('/todos/:id(\\d+)/done', (request, response) => {
    const index = request.params.id - 1;
    manipulate.mark(index, false, response);
});

app.delete('/todos/:id(\\d+)', (request, response) => {
    const index = request.params.id - 1;
    manipulate.remove(index, response);
});

app.put('/todos/:id(\\d+)', (request, response) => {
    const index = request.params.id - 1;
    manipulate.update(index, request.body.task, response);
});

app.listen(port, () => console.log(`app listening on port ${port}!`));