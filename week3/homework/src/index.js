'use strict';

// TODO: Write the homework code in this file

const express = require('express');
const app = express();
const port = 3000;

const functions = require('./functions');

app.use(express.json());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/', (request, response) => {
  response.json(functions.help());
});

app.get('/todos', (request, response) => {
  response.json(functions.list());
});

app.post('/todos', (request, response) => {
  response.json(functions.create(request));
});

app.get('/todos/:id', (request, response) => {
  response.json(functions.getToDoById(request.params.id));
});

app.put('/todos/:id', (request, response) => {
  response.json(functions.update(request, request.params.id));
});

app.post('/todos/:id/done', (request, response) => {
  response.json(functions.markToDo(request.params.id, request.method));
});

app.delete('/todos/:id/done', (request, response) => {
  response.json(functions.markToDo(request.params.id, request.method));
});

app.delete('/todos/:id', (request, response) => {
  response.json(functions.deleteToDoById(request.params.id));
});

app.delete('/todos', (request, response) => {
  response.json(functions.clearList());
});
