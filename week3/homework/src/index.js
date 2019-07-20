'use strict';

const express = require('express');
const app = express();
const {
  createTodo,
  updateTodo,
  readTodos,
  deleteTodo,
  readTodo,
  clearTodos,
  markAsDone,
  markAsNotDone
} = require('./actions');

app.post('/todos', (req, res) => {
  createTodo(req, res)
    .then(todos => res.status(200).json(todos))
    .catch(error => res.status(500).send({ message: error.message }));
});

app.get('/todos', (req, res) => {
  readTodos(req, res)
    .then(todos => res.status(200).json(todos))
    .catch(error =>
      res.status(500).send({ message: "can't read file!", error })
    );
});

app.put('/todos/:id', (req, res) => {
  updateTodo(req, res)
    .then(todos => res.status(200).json(todos))
    .catch(error => res.status(500).send({ message: error.message }));
});

app.delete('/todos/:id', (req, res) => {
  deleteTodo(req, res)
    .then(todo => res.status(200).json(todo))
    .catch(error =>
      res.status(500).send({ message: 'Item not found!', error })
    );
});

app.get('/todos/:id', (req, res) => {
  readTodo(req, res)
    .then(todo => res.status(200).json(todo))
    .catch(error =>
      res.status(500).send({ message: 'Item not found!', error })
    );
});

app.post('/todos/:id/done', (req, res) => {
  clearTodos(req, res)
    .then(() => res.status(200).send('Items are deleted!'))
    .catch(error =>
      res.status(500).send({ message: "Items couldn't be deleted!", error })
    );
});

app.put('/todos', (req, res) => {
  markAsDone(req, res)
    .then(id => res.status(200).send(`Item updated! ${id}`))
    .catch(error =>
      res.status(500).send({ message: 'Item not found!', error })
    );
});
app.delete('/todos/:id/done', (req, res) => {
  markAsNotDone(req, res)
    .then(id => res.status(200).send(`Item updated! ${id}`))
    .catch(error =>
      res.status(500).send({ message: 'Item not found!', error })
    );
});

app.listen(3000, () => console.log('listening on port!', 3000));
