'use strict';

// TODO: Write the homework code in this file

const Express = require('express');
const {
  // TODO: implement the following actions:
  createToDo,
  deleteToDo,
  readToDos,
  updateToDo,
  markAsDone,
} = require('./actions');

const PORT = 3000;

const app = Express();

// request body parser
app.use(Express.json());

// TODO: implement readTodo, clearTodos, markAsDone and markAsNotDone routes and actions

// readTodos
app.get('/todos', (req, res) => {
  readToDos()
    .then(toDoList => res.send(toDoList))
    .catch(err => next(err));
});

// createTodo
app.post('/todos', (req, res, next) => {
  const { todo } = req.body;
  
  readToDos()
    .then(currentToDo => currentToDo.todo = todo)
    .then(createToDo)
    .then(readToDos)
    .then(toDoList => res.send(toDoList))
    .catch(err => next(err));
});

// updateTodo
app.put('/todos/:id', (req, res, next) => {
  const { id } = req.params;
  const { newToDo } = req.body;

  updateToDo(id, newToDo)
    .then(createToDo)
    .then(readToDos)
    .then(toDoList => res.send(toDoList))
    .catch(err => next(err));
});

// clearTodo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  deleteToDo(id)
    .then(createToDo)
    .then(readToDos)
    .then(toDoList => res.send(toDoList))
    .catch(err => next(err));
});

// markAsDone
app.put('/todos/:id/done', (req, res, next) => {
  const { id } = req.params;
  const state = 'done';

  markAsDone(id, state)
    .then(createToDo)
    .then(readToDos)
    .then(toDoList => res.send(toDoList))
    .catch(err => next(err));
});

// markAsNotDone
app.put('/todos/:id/undone', (req, res, next) => {
  const { id } = req.params;
  const state = 'undone';

  markAsDone(id, state)
    .then(toDoList => res.send(toDoList))
    .catch(err => next(err));
});

// error handling
app.use((error, req, res, next) => {
  res.status(500).send({ error });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));