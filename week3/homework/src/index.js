'use strict';

const {
  readAndParse,
  create,
  update,
  deleteToDo,
  showOneToDo,
  mark,
  handleError,
} = require('./actionsAndStaff');

const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', async (request, response) => {
  try {
    response.json(await readAndParse('help'));
  } catch (error) {
    response.status(error.statusCode || 500).json(handleError(error));
  }
});

app.get('/todos', async (request, response) => {
  try {
    response.json(await readAndParse());
  } catch (error) {
    response.status(error.statusCode || 500).json(handleError(error));
  }
});

app.get('/todos/:id', async (request, response) => {
  try {
    response.json(await showOneToDo(request.params.id));
  } catch (error) {
    response.status(error.statusCode || 500).json(handleError(error));
  }
});

app.post('/todos', async (request, response) => {
  try {
    response.status(201).json(await create(request));
  } catch (error) {
    response.status(error.statusCode || 500).json(handleError(error));
  }
});

app.post('/todos/:id/done', async (request, response) => {
  try {
    response.json(await mark(request.params.id));
  } catch (error) {
    response.status(error.statusCode || 500).json(handleError(error));
  }
});

app.put('/todos/:id', async (request, response) => {
  try {
    response.json(await update(request, request.params.id));
  } catch (error) {
    response.status(error.statusCode || 500).json(handleError(error));
  }
});

app.delete('/todos', async (request, response) => {
  try {
    response.json(await deleteToDo());
  } catch (error) {
    response.status(error.statusCode || 500).json(handleError(error));
  }
});

app.delete('/todos/:id', async (request, response) => {
  try {
    response.json(await deleteToDo(request.params.id));
  } catch (error) {
    response.status(error.statusCode || 500).json(handleError(error));
  }
});

app.delete('/todos/:id/done', async (request, response) => {
  try {
    response.json(await mark(request.params.id, request.method));
  } catch (error) {
    response.status(error.statusCode || 500).json(handleError(error));
  }
});

app.listen(PORT, () => console.log(`Server is listening on => http://localhost:${PORT}`));
