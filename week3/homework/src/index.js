'use strict';

// TODO: Write the homework code in this file

const Express = require('express');

const PORT = 3000;

const app = Express();

// request body parser
app.use(Express.json());

const uuid = require('uuid/v4');
const { readFile, writeFile} = require('fs');
const { promisify } = require('util');
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);
const TODO_PATH = 'todo.json';

function readTodos() {
  return readFileWithPromise(TODO_PATH, 'utf8').then(
    JSON.parse, () => []
  );
}

function writeTodos(data) {
  return writeFileWithPromise(TODO_PATH, JSON.stringify(data, null, 2));
}

// createTodo
app.post('/todos', async(req, res, next) => {
  const newTodo = req.body;
  newTodo.id = uuid();

  const todos = await readTodos();
  todos.push(newTodo);
  await writeTodos(todos);

  res.json(todos);
});

// readTodos
app.get('/todos', async(req, res) => {
  const todos = await readTodos();
  res.json(todos);
});

// updateTodo
app.put('/todos/:id', (req, res) => {

});

// deleteTodo
app.delete('/todos/:id', (req, res) => {

// ========this code below is wrong, i still have to fix it============

/* const id = req.params.id;
  const todos = await readTodos();
  const todo = todos.find(x => x.id === id);
  res.json(todo); */
});

// readTodo
app.get('/todos/:id', async(req, res) => {
  const id = req.params.id;
  const todos = await readTodos();

  const todo = todos.find(function(singleTodo) {
    return singleTodo.id === id;
  });

  res.json(todo);
});

// clearTodos
app.delete('/todos', async(req, res) => {
  await writeTodos([]);
  res.json([]);
});

// TODO: implement readTodo, clearTodos, markAsDone and markAsNotDone routes and actions

// error handling
app.use((error, req, res, next) => {
  res.status(500).send({ error });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
