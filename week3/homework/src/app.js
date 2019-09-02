'use strict';

const dataDealer = require('./data/data_dealer');
const read = dataDealer.read;
//  handling endpoints/routing with express

const express = require('express');
const app = express();

app.use(express.json());

app.all('/', (req, res, next) => {
  res.status(200).json({ testExpress: 'Express is working!' });
});

app.post('/todos', (req, res, next) => {
  res.status(200).json({ testExpress: 'POST method: Express handler.' });
  const newTodo = req.body.todo.description;
  console.log(newTodo);
});

app.get('/todos', (req, res, next) => {
  read('./data/todolist.json', 'utf8')
    .then(result => res.status(200).send(result))
    .catch(err => res.status(404).json({ Error: err.message }));
});

app.put('/todos/:id', (req, res, next) => {
  res.status(200).json({
    testExpress: 'Put method: Express handler.',
    id: req.params.id
  });
});

app.delete('/todos/:id', (req, res, next) => {
  res.status(200).json({
    testExpress: 'Delete method: Express handler.',
    id: req.params.id
  });
});

module.exports = app;
