'use strict';

const express = require('express');
const app = express();
const add = require('./add');
const list = require('./list');
const update = require('./update');
const remove = require('./remove');
const reset = require('./reset');
const readTodo = require('./readTodo');
const markAsDone = require('./markAsDone');
const markAsNotDone = require('./markAsNotDone');

app.use(express.json());

try {
  app.get('/todos', (request, response) => {
    list();
    response.status(200).json({ message: `the list of todos is requested` });
  });

  app.get('/todos/:id', (request, response) => {
    readTodo(request.params.id);
    response.status(200).json({ message: `todo with the id of ${request.params.id} is requested` });
  });

  app.post('/todos', (request, response) => {
    const addTodo = request.body;
    const id = addTodo.id;
    const text = addTodo.text;
    add(id, text);
    response.status(201).json({ message: `todo with the id of ${id} is added` });
  });

  app.put('/todos', (request, response) => {
    const updateTodo = request.body;
    const id = updateTodo.id;
    const text = updateTodo.text;
    update(id, text);
    response.status(201).json({ message: `todo with the id of ${id} is updated` });
  });

  app.delete('/todos/:id', (request, response) => {
    remove(request.params.id);
    response.status(201).json({ message: `todo with the id of ${request.params.id} is removed` });
  });

  app.delete('/todos', (request, response) => {
    reset();
    response.status(201).json({ message: 'todo list is cleared' });
  });

  app.post('/todos/:id/done', (request, response) => {
    markAsDone(request.params.id);
    response.status(201).json({ message: `todo with the id of ${request.params.id} is done` });
  });

  app.delete('/todos/:id/done', (request, response) => {
    markAsNotDone(request.params.id);
    response.status(201).json({ message: `todo with the id of ${request.params.id} is not done` });
  });
} catch (error) {
  response
    .status(500)
    .send(`The server has encountered a situation it doesn't know how to handle.`);
}
app.listen(3000, () => console.log('Listening on port 3000!'));
