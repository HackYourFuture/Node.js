'use strict';

// TODO: Write the homework code in this file

const Express = require('express');
const {
  // TODO: implement the following actions:
  createToDo,
  deleteToDo,
  resetToDos,
  readToDos,
  updateToDo,
  markAsDoneNotDone
} = require('./actions');

const PORT = 3000;

const app = Express();

// request body parser
app.use(Express.json());

// TODO: implement readTodo, clearTodos, markAsDone and markAsNotDone routes and actions

// readTodos
app.get('/todos', (req, res, next) => {
  readToDos()
    .then(toDoList => res.send(toDoList))
    .catch(err => next(err));
});

// createTodo
app.post('/todos', (req, res, next) => {
  const { todo } = req.body;

  createToDo(todo)
    .then(readToDos)
    .then(toDoList => res.send(toDoList))
    .catch(err => next(err));
});

// updateTodo
app.put('/todos/:id', (req, res, next) => {
  const { id } = req.params;
  const newToDo = req.body;

  updateToDo(id, newToDo)
    .then(readToDos)
    .then(toDoList => res.send(toDoList))
    .catch(err => next(err));
});

// clearTodo
app.delete('/todos/:id', (req, res, next) => {
  const { id } = req.params;
  deleteToDo(id)
    .then(readToDos)
    .then(toDoList => res.send(toDoList))
    .catch(err => next(err));
});

// resetTodos
app.delete('/todos', (req, res, next) => {
  console.log('trying to reset');
  resetToDos()
    .then(res.send(`List is reset`))
    .catch(err => next(err));
});

// markAsDone
app.post('/todos/:id/done', (req, res, next) => {
  const { id } = req.params;
  const state = 'done';

  markAsDoneNotDone(id, state)
    .then(readToDos)
    .then(toDoList => res.send(toDoList))
    .catch(err => next(err));
});

// markAsNotDone
app.delete('/todos/:id/undone', (req, res, next) => {
  const { id } = req.params;
  const state = 'undone';

  markAsDoneNotDone(id, state)
    .then(readToDos)
    .then(toDoList => res.send(toDoList))
    .catch(err => next(err));
});

// error handling
app.use((error, req, res, next) => {
  res.status(500).send({ error });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
