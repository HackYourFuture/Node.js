/*
'use strict';

// TODO: Write the homework code in this file

const Express = require('express');
const {
  // TODO: implement the following actions:
  createTodo,
  deleteTodo,
  readTodos,
  updateTodo
} = require('./actions');

const PORT = 3000;

const app = Express();

// request body parser
app.use(Express.json());
// ============================
app.use((req, res, next) => {
  console.log(req.params);
  next();
});
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// ============================
// createTodo
app.post('/todos', (req, res, next) => {
  const { todo } = req.body;

  createTodo(todo)
    .then(data => res.send(data))
    .catch(err => next(err));
});

// readTodos
app.get('/todos', (req, res) => {
  readTodos()
    .then(data => res.send(data))
    .catch(err => next(err));
});

// updateTodo
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  updateTodo(id, todo)
    .then(data => res.send(data))
    .catch(err => next(err));
});

// deleteTodo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  deleteTodo(id)
    .then(data => res.send(data))
    .catch(err => next(err));
});

// TODO: implement readTodo, clearTodos, markAsDone and markAsNotDone routes and actions

// error handling
app.use((error, req, res, next) => {
  res.status(500).send({ error });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
*/
// https://github.com/azat-co/todo-express/blob/master/routes/tasks.js

// =========================================================================

'use strict';

// TODO: Write the homework code in this file

const Express = require('express');

const PORT = 3000;

const app = Express();

// request body parser
app.use(Express.json());
// -----------------------------------------------------------------------
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
// ------------------------------------------------------------------

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
app.delete('/todos/:id', async(req, res) => {
/* const id = req.params.id;
  const todos = await readTodos();
  const todo = todos.find(x => x.id === id);
  writeTodos([]);
  res.json(todo); */
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
