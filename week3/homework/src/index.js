'use strict';

const {
  readAndParse,
  create,
  update,
  deleteToDo,
  showOneToDo,
  mark,
  handleError,
  wrap,
} = require('./actionsAndStaff');

const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', wrap(async (request, response) => await readAndParse('help')));

app.get('/todos', wrap(async (request, response) => await readAndParse()));

app.get('/todos/:id', wrap(async (request, response) => await showOneToDo(request.params.id)));

app.post('/todos', wrap(async (request, response) => await create(request), 201));

app.post('/todos/:id/done', wrap(async (request, response) => await mark(request.params.id)));

app.put('/todos/:id', wrap(async (request, response) => await update(request, request.params.id)));

app.delete('/todos', wrap(async (request, response) => await deleteToDo()));

app.delete('/todos/:id', wrap(async (request, response) => await deleteToDo(request.params.id)));

app.delete(
  '/todos/:id/done',
  wrap(async (request, response) => await mark(request.params.id, request.method)),
);

app.listen(PORT, () => console.log(`Server is listening on => http://localhost:${PORT}`));
