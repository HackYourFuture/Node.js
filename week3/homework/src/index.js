'use strict';

// TODO: Write the homework code in this file

const express = require('express');
const uuid = require('uuid/v4');
const { readFile: _readFile, writeFile: _writeFile } = require('fs');
const { promisify } = require('util');

const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);
const app = express();

// Use built-in JSON middleware to automatically parse JSON:
app.use(express.json());
const toDoFile = 'todo.json';

function readToDos() {
  return readFile(toDoFile, 'utf8').then(
    JSON.parse,
    () => []
  );
}

function writeToDos(todos) {
  return writeFile(toDoFile, JSON.stringify(todos, null, 2));
}

// Read all the todos:
app.get('/todos', async (req, res) => {
  const todos = await readToDos();
  res.status(200).json(todos);
});

// Read a todo by ID:
app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todos = await readToDos();
  const todo = todos.find(x => x.id === id);
  res.json(todo);
});

// Create a new todo:
app.post('/todos', async (req, res) => {
  const newToDo = req.body;
  newToDo.id = uuid();
  newToDo.done = false;
  const todos = await readToDos();
  todos.push(newToDo);
  await writeToDos(todos);
  res.json(todos);
});

// Delete a todo by ID:
app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todos = await readToDos();
  const toDoIndex = todos.findIndex(x => x.id === id);
  if (toDoIndex < 0) {
    res.status(400).json({ error: 'bad request' });
  } else {
    todos.splice(toDoIndex, 1);
    await writeToDos(todos);
    res.status(200).json(todos);
  }
});

// Delete all todos:
app.delete('/todos', async (req, res) => {
  await writeToDos([]);
  res.json([]);
});

// Update a todo by ID:
app.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todos = await readToDos();
  const updateIndex = todos.findIndex(x => x.id === id);
  if (updateIndex < 0) {
    res.status(400).json({ error: 'bad request' });
  } else {
    todos[updateIndex].description = req.body.description;
    await writeToDos(todos);
    res.status(200).json(todos);

  }
});

// markAsDone:
app.post('/todos/:id/done', async (req, res) => {
  const id = req.params.id;
  const todos = await readToDos();
  const updateIndex = todos.findIndex(x => x.id === id);
  if (updateIndex < 0) {
    res.status(400).json({ error: 'bad request' });
  } else {
    todos[updateIndex].done = true;
    await writeToDos(todos);
    res.status(200).json(todos);
  }
});

// markAsNotDone:
app.delete('/todos/:id/done', async (req, res) => {
  const id = req.params.id;
  const todos = await readToDos();
  const updateIndex = todos.findIndex(x => x.id === id);
  if (updateIndex < 0) {
    res.status(400).json({ error: 'bad request' });
  } else {
    todos[updateIndex].done = false;
    await writeToDos(todos);
    res.status(200).json(todos);
  }
});

app.listen(3000, () => {
  console.info('Listening on http://localhost:3000');
});