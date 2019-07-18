'use strict';

const express = require('express');

const readTodos = require('./readTodos');
const createTodo = require('./createTodo');
const deleteTodo = require('./deleteTodo');
const updateTodo = require('./updateTodo');
const readTodo = require('./readTodo');
const clearTodos = require('./clearTodos');
const markAsDone = require('./markAsDone');
const markAsNotDone = require('./markAsNotDone');

const app = express();

app.use(express.json());

try {
  app.get('/todos', (request, response) => {
    readTodos().then(todos => response.status(200).json(todos));
  });

  app.get('/todos/:id', (request, response) => {
    const id = request.params.id;
    readTodo(id).then(todo => {
      response.status(200).json(todo);
    });
  });

  app.post('/todos', (request, response) => {
    const addTodo = request.body;
    const description = addTodo.description;
    createTodo(description);
    response.status(201).json(addTodo);
  });

  app.post('/todos/:id/done', (request, response) => {
    const id = request.params.id;
    markAsDone(id);
    response.status(201).json('Done');
  });

  app.put('/todos/:id', (request, response) => {
    const id = request.params.id;
    const description = request.body.description;
    updateTodo(id, description);
    response.status(201).json(request.body);
  });

  app.delete('/todos', (request, response) => {
    clearTodos();
    response.status(201).json('Clear list, nothing to be done');
  });

  app.delete('/todos/:id', (request, response) => {
    const id = request.params.id;
    deleteTodo(id);
    response.status(201).json(`To-do with the ID << ${id} >> is successfully deleted`);
  });

  app.delete('/todos/:id/done', (request, response) => {
    const id = request.params.id;
    markAsNotDone(id);
    response.status(201).json('Not done');
  });
} catch (error) {
  console.log(error);
  response.status(500);
  response.json('Something went wrong');
}
app.listen(3000, () => console.log('Listening on port 3000'));
