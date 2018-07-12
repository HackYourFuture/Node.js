'use strict';

// TODO: Write the homework code in this file

const Express = require('express');

const {
  // TODO: implement the following actions:
  createTodo,
  deleteTodo,
  readTodos,
  updateTodo,
  clearTodos
} = require('./actions');

const PORT = 3000;

const app = Express();

// request body parser
app.use(Express.json());

// createTodo
app.post('/todos/', (req, res, next) => {
  const { todo } = req.body;

  createTodo(todo)
    .then(data => res.send(data))
    .catch(err => next({ err : err.message }));
});

// readTodos
app.get('/todos', (req, res) => {

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
    .catch(err => next({ err : err.message }));
});

// deleteTodo
app.delete('/todos/:id', (req, res, next) => {
  const { id } = req.params;

  deleteTodo(id)
    .then(data => res.send(data))
    .catch(err => next(err.message));
});

// clear todos (tried to use delete method but it did not work)

app.post('/todos/clear', (req, res, next) => {
  
  clearTodos()
    .then(data => res.send(data))
    .catch (err => next({ err : err.message }));
});

// TODO: implement readTodo, clearTodos, markAsDone and markAsNotDone routes and actions

// error handling
app.use((error, req, res, next) => {
  res.status(500).send({ error });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

