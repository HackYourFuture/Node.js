'use strict';
// TODO: Write the homework code in this file
const express = require('express');
const uuid = require('uuid/v4');
const app = express();
const { readFile: _readFile, writeFile: _writeFile } = require('fs');
const { promisify } = require('util');

const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);
//build-in json middleware to automatically parse json
app.use(express.json());

const TODO_FILE = 'todos.json';

function readTodos() {
  return readFile(TODO_FILE, `utf8`).then(
    JSON.parse,
    () => ({})
  );
}

function writeTodos(data) {
  return writeFile(TODO_FILE, JSON.stringify(data));
}

//Read all todos
app.get('/todos', async (req, res) => {
  const todos = await readTodos();
  res.json(todos);
});

//Read a todo by ID
app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  if (todos.hasOwnProperty(id)) {
    res.json(todos[id]);
  }
  else {
    res.json({ error: "id not found" });
  }
});

//Create a todo
app.post('/todos', async (req, res) => {
  const newTodo = req.body.todo;
  const id = uuid();
  const todos = await readTodos();
  todos[id] = newTodo;
  todos[id].done = false;
  await writeTodos(todos);
  res.json(todos);
});

//Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  if (todos.hasOwnProperty(id)) {
    delete todos[id];
    await writeTodos(todos);
    res.json(todos);
  }
  else {
    res.json({ error: "id not found" });
  }
});

//Delete all todos
app.delete('/todos', async (req, res) => {
  await writeTodos({});
  res.json({});
});

//update a todo
app.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  const updatedTodo = req.body.todo;
  if (todos.hasOwnProperty(id)) {
    todos[id].description = updatedTodo.description;
    await writeTodos(todos);
    res.json(todos[id]);
  }
  else {
    res.json({ error: "id not found" });
  }
});
//markAsDone
app.post('/todos/:id/done', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  if (todos.hasOwnProperty(id)) {
    todos[id].done = true;
    await writeTodos(todos);
    res.json(todos[id]);
  }
  else {
    res.json({ error: "id not found" });
  }
});

//markAsNotDone
app.delete('/todos/:id/done', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  if (todos.hasOwnProperty(id)) {
    todos[id].done = false;
    await writeTodos(todos);
    res.json(todos[id]);
  }
  else {
    res.json({ error: "id not found" });
  }
});

app.listen(3000, () => {
  console.info(`listening on http://localhost:3000`);
});
