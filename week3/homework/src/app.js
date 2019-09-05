'use strict';

const express = require('express');
const app = express();
const Api = require('./api');
const Validator = require('./validator');
const api = new Api();
const validator = new Validator();
// Use userValidator middleware
app.use(validator.userValidator);
// Use built-in JSON middleware to automatically parse JSON
app.use(express.json());

app.get('/todos/:id', api.getSpecificTodo);
app.get('/todos/', api.readTodos);
app.put('/todos/:id', validator.userValidator, api.updateTodo);
app.post('/todos', validator.userValidator, api.createTodo);
app.delete('/todos/:id', api.deleteTodo);
app.delete('/todos', api.deleteTodos);
app.delete('/todos/:id/done', (req, res) => {
  let done = false;
  let task = 'The task is not completed!';
  api.checkTask(req, res, done, task);
});
app.post('/todos/:id/done', (req, res) => {
  let done = true;
  let task = 'The task is completed \u2713';
  api.checkTask(req, res, done, task);
});

const port = process.env.PORT || 3000;
app.listen(port, err => {
  if (err) return console.log(err);
  console.log(`Server started on http://localhost:${port}`);
});
