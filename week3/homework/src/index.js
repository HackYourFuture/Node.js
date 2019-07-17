'use strict';

const {
  readAndParse,
  create,
  update,
  deleteToDo,
  showOneToDo,
  mark,
  handleError,
} = require('./actions');

const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (request, response) => {
  readAndParse('help')
    .then(help => response.json(help))
    .catch(error => response.status(error.statusCode || 500).json(handleError(error)));
});

app.get('/todos', (request, response) => {
  readAndParse()
    .then(list => response.json(list))
    .catch(error => response.status(error.statusCode || 500).json(handleError(error)));
});

app.get('/todos/:id', (request, response) => {
  showOneToDo(request.params.id)
    .then(result => response.json(result))
    .catch(error => response.status(error.statusCode || 500).json(handleError(error)));
});

app.post('/todos', (request, response) => {
  create(request)
    .then(result => response.status(201).json(result))
    .catch(error => response.status(error.statusCode || 500).json(handleError(error)));
});

app.post('/todos/:id/done', (request, response) => {
  mark(request.params.id)
    .then(result => response.json(result))
    .catch(error => response.status(error.statusCode || 500).json(handleError(error)));
});

app.put('/todos/:id', (request, response) => {
  update(request, request.params.id)
    .then(result => response.json(result))
    .catch(error => response.status(error.statusCode || 500).json(handleError(error)));
});

app.delete('/todos', (request, response) => {
  deleteToDo()
    .then(result => response.json(result))
    .catch(error => response.status(error.statusCode || 500).json(handleError(error)));
});

app.delete('/todos/:id', (request, response) => {
  deleteToDo(request.params.id)
    .then(result => response.json(result))
    .catch(error => response.status(error.statusCode || 500).json(handleError(error)));
});

app.delete('/todos/:id/done', (request, response) => {
  mark(request.params.id, request.method)
    .then(result => response.json(result))
    .catch(error => response.status(error.statusCode || 500).json(handleError(error)));
});

app.listen(PORT, () => console.log(`Server is listening on => http://localhost:${PORT}`));
