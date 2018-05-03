'use strict';

const express = require('express');
const uuid = require('uuid/v4');

const { readFile: _readFile, writeFile: _writeFile } = require('fs');

const { promisify } = require('util');

const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);

const app = express();

// Use built -in JSON middleware to automatically parse JSON
app.use(express.json());

const TODO_FILE = 'todo.json';

function readTodos() {
  return readFile(TODO_FILE, 'utf8').then(
    JSON.parse,
    () => []
  );
}

function writeTodos(todos) {
  return writeFile(TODO_FILE, JSON.stringify(todos, null, 2));
}

// Read all todos
app.get('/todos', async(req, res) => {
  const todos = await readTodos();
  res.json(todos);
});

// Read a todo by ID
app.get('/todos/:id', async(req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  const todo = todos.find(x => x.id === id);

  res.json(todo);
});

// Create a todo
app.post('/todos', async(req, res) => {
  const newTodo = req.body;

  newTodo.id = uuid();

  const todos = await readTodos();

  todos.push(newTodo);

  await writeTodos(todos);

  res.json(todos);
});

// Delete a todo by ID
app.delete('/todos/:id', async(req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  if (id in todos) {
    delete todos[id];
    await writeTodos(todos);
    res.json(todos);
  }
  else {
    res.json(`there is no ID`);
  }
});

// Delete all todos
app.delete('/todos', async(req, res) => {
  await writeTodos([]);
  res.json([]);
});

// Update a todo by ID
app.put('/todos/:id', async(req, res) => {
  const id = req.params.id;
  const newTodo = req.body;
  const todos = await readTodos();
  if (id in todos) {
    todos[id].description = newTodo.description;
    await writeTodos(todos);
    res.json(todos);
  }
  else {
    res.json(`there is no ID`);
  }
});
app.post('/todos/:id/done', async(require, response) => {
  const Done = require.params.id;
  const todos = await readTodos();

  const idToChangeStatus = todos.find(todo => todo.id === Done);
  idToChangeStatus.done = true;
  await writeTodos(todos);
  response.send(`The status of "${Done}" changed as "true".`);
  response.json(todos);
});
app.delete('/todos/:id/done', async(require, response) => {
  const NotDone = require.params.id;
  const todos = await readTodos();
  const idToChangeStatus = todos.find(todo => todo.id === NotDone);
  idToChangeStatus.done = false;
  await writeTodos(todos);
  response.send(`The status of "${NotDone}" changed as "false".`);
  response.json(todos);
});

app.listen(3000, () => {
  console.info('Listening on http://localhost:3000');
});
