'use strict';

// TODO: Write the homework code in this file
const express = require('express');
const uuid    = require('uuid/v4');

const { readFile: _readFile, writeFile: _writeFile } = require('fs');
const { promisify } = require('util');

const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);

const TODO_FILE = 'todo.json';

function readTodos() {
  return readFile(TODO_FILE, 'utf8').then(
    JSON.parse,
    () => ({})
  );
}

function writeTodos(todos) {
  return writeFile(TODO_FILE, JSON.stringify(todos, null, 2));
}

const app = express();
app.use(express.json());

// Add todo to the file
app.post('/todos', async(request, response) => {
  const newTodo = request.body;
  newTodo.done = false;
  const todos = await readTodos();
  todos[uuid()] = newTodo;
  await writeTodos(todos);
  response.json(todos);
});

// Get todo by ID  'readTodo'
app.get('/todos/:id', async(request, response) => {
  const todos = await readTodos();
  const id = request.params.id;
  await writeTodos(todos);
 id in todos ? response.json(todos[id]) : response.json('This todo does not exist!') ;
});

//  'markAsDone '
app.post('/todos/:id/done', async(request, response) => {
  const todos = await readTodos();
  const id = request.params.id;
  todos[id].done = true;
  await writeTodos(todos);
 id in todos ? response.json(todos[id]) : response.json('This todo does not exist!') ;
});

// 'markAsNotDone  '
app.delete('/todos/:id/done', async(request, response) => {
  const todos = await readTodos();
  const id = request.params.id;
  todos[id].done = false;
  id in todos ? await writeTodos(todos) :  response.json('This todo does not exist!'); 
 response.json(todos[id]) 
});

//Delete all todos 'clearTodos '
app.delete('/todos', async(request, response) => {
  await writeTodos({});
  response.json('Todos has been deleted!');
});

app.listen(3000, () => {
  console.info('Listening on http://localhost:3000');
});
