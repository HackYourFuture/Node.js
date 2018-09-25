'use strict';

// TODO: Write the homework code in this file

const Express = require('express');
const bodyParser = require('body-parser');

const {
  validateTask,
  appendToDo,
  removeToDo,
  readToDoList,
  clearTodos,
  updateToDoList,
  markTodo
} = require('./utilities');

const app = Express();
app.use(bodyParser.json());

app.use(Express.json());

app.post('/todos', (req, res, next) => {
  validateTask(req.body);
  const { todo } = req.body;
  appendToDo(todo)
    .then(data => res.send(data))
    .catch(err => next(err.message));
});

app.get('/todos', (req, res, next) => {
  readToDoList()
    .then(data => res.send(data))
    .catch(err => next(err.message));
});

app.put('/todos/:id', (req, res, next) => {
  validateTask(req.body);
  const { id } = req.params;
  const { todo } = req.body;

  updateToDoList(id, todo)
    .then(data => res.send(data))
    .catch(err => next(err.message));
});

app.delete('/todos/:id', (req, res, next) => {
  const { id } = req.params;

  removeToDo(id)
    .then(data => res.send(data))
    .catch(err => next(err.message));
});
app.delete('/todos', (req, res, next) => {
  clearTodos()
    .then(data => res.send(data))
    .catch(err => next(err.message));
});
app.post('/todos/:id/done', (req, res, next) => {
  const { id } = req.params;
  markTodo(id, true)
    .then(data => res.send(data))
    .catch(err => next(err.message));
});
app.delete('/todos/:id/done', (req, res, next) => {
  const { id } = req.params;
  markTodo(id, false)
    .then(data => res.send(data))
    .catch(err => next(err.message));
});
app.use((error, req, res, next) => {
  res.status(500).send({ error });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
