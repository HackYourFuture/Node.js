'use strict';

const express = require('express');
const uuid = require('uuid/v4');
const {
  readFile: _readFile,
  writeFile: _writeFile
} = require('fs');
const {
  promisify
} = require('util');
const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);
const app = express();

// Use built-in JSON middleware to automatically parse JSON
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
app.get('/todos', async (req, res) => {
  const todos = await readTodos();
  res.status(200).json(todos);
});

// Read a todo by ID
app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  const todo = todos.find(x => x.id === id);
  res.json(todo);
});

// Create a todo
app.post('/todos', async (req, res) => {
  const newTodo = req.body;
  newTodo.id = uuid();
  newTodo.done = false;
  const todos = await readTodos();
  todos.push(newTodo);
  await writeTodos(todos);
  res.json(todos);
});

// Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  const todoIndex = todos.findIndex(x => x.id === id);
  if (todoIndex < 0) {
    res.status(400).json({
      error: 'bad request'
    });
  } else {
    todos.splice(todoIndex, 1);
    await writeTodos(todos);
    res.status(200).json(todos);
  }
});

// Delete all todos
app.delete('/todos', async (req, res) => {
  await writeTodos([]);
  res.json([]);
});

// Update a todo by ID
app.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  const updateIndex = todos.findIndex(x => x.id === id);
  if (updateIndex < 0) {
    res.status(400).json({
      error: 'bad request'
    });
  } else {
    todos[updateIndex].description = req.body.description;
    await writeTodos(todos);
    res.status(200).json(todos);

  }
});
// markAsDone
app.post('/todos/:id/done', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  const updateIndex = todos.findIndex(x => x.id === id);
  if (updateIndex < 0) {
    res.status(400).json({
      error: 'bad request'
    });
  } else {
    todos[updateIndex].done = true;
    await writeTodos(todos);
    res.status(200).json(todos);
  }
});

// markAsNotDone
app.delete('/todos/:id/done', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  const updateIndex = todos.findIndex(x => x.id === id);
  if (updateIndex < 0) {
    res.status(400).json({
      error: 'bad request'
    });
  } else {
    todos[updateIndex].done = false;
    await writeTodos(todos);
    res.status(200).json(todos);
  }
});

app.listen(3000, () => {
  console.info('Listening on http://localhost:3000');
});