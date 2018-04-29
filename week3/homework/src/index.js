'use strict';

// TODO: Write the homework code in this file

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

//USE BUILT-IN JSON middleware to automatically parse JSON
app.use(express.json());

const TODO_FILE = 'todo.json';

function readTodos() {
  return readFile(TODO_FILE, 'utf-8').then(JSON.parse, () => []);

}

function writeTodos(todos) {
  return writeFile(TODO_FILE, JSON.stringify(todos));

}

//READ ALL TODOs
app.get('/todos', async (req, res) => {
  const todos = await readTodos();
  res.json(todos);
  res.end();
});

//READ TODO BY ID
app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  const todo = todos.find(x => x.id === id);
  res.json(todo);
  res.end();
});

//CREATE TODO
app.post('/todos', async (req, res) => {
  const newTodo = req.body;
  newTodo.id = uuid();
  newTodo.done = false;
  const todos = await readTodos();
  todos.push(newTodo);
  await writeTodos(todos);
  res.json(todos);
  res.end();

});

//DELETE TODO BY ID
app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  const index = todos.findIndex(x => x.id === id);
  if (!todos.hasOwnProperty('id')) {
    return res.status(500).send("There is no object with this ID !!! ");
  } else {
    todos.splice(index, 1);
    await writeTodos(todos);
    res.json(todos);
    res.end();
  }

});

//DELETE ALL TODOs
app.delete('/todos', async (req, res) => {
  await writeTodos([]);
  res.json([]);
  res.end();
});

//UPDATE TODO BY ID
app.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  const newTodo = req.body;
  newTodo.id = id;
  const index = todos.findIndex(x => x.id === id);
  newTodo.done = todos[index].done;
  todos.splice(index, 1, newTodo);
  await writeTodos(todos);
  res.json(todos);
  res.end();


});

//markAsDone TODO
app.post('/todos/:id/done', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  const newTodos = todos.find(todos => todos.id === id);
  newTodos.done = true;
  await writeTodos(todos);
  res.json(todos);
  res.end();

});

//markAsNotDone TODO
app.delete('/todos/:id/done', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  const newTodos = todos.find(todos => todos.id === id);
  newTodos.done = false;
  await writeTodos(todos);
  res.json(todos);
  res.end();

});


app.listen(3000, () => {
  console.info('Listening on http://localhost:3000');
});