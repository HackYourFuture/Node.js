'use strict';

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

// createTodo
app.post('/todos', (req, res, next) => {
  const { todo } = req.body;

  createTodo(todo)
    .then(data => res.send(data))
    .catch(err => next(err));
});

// readTodos
app.get('/todos', (req, res, next) => {
  readTodos()
    .then(data => res.send(data))
    .catch(err => next(err));
});

// updateTodo
app.put('/todos/:id', (req, res, next) => {
  const { id } = req.params;
  const { todo } = req.body;

  updateTodo(id, todo)
    .then(data => res.send(data))
    .catch(err => next(err));
});

// deleteTodo
app.delete('/todos/:id', (req, res, next) => {
  const { id } = req.params;

  deleteTodo(id)
    .then(data => res.send(data))
    .catch(err => next(err.message));
});

// TODO: implement readTodo, clearTodos, markAsDone and markAsNotDone routes and actions

// error handling
app.use((error, req, res, next) => {
  res.status(500).send({ error });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
