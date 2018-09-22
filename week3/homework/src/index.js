'use strict';

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const functions = require('./functions.js');
const app = express();
app.use(bodyParser.json());

app.get('/todos/:id', (request, response) => {
  const index = request.params.id;
  fs.readFile('./src/to-do.json', 'utf8', (error, data) => {
    const todos = data ? JSON.parse(data) : [];
    if (error) {
      console.log(error);
      response
        .status(500)
        .json({ result: 'error' });
      return;
    }
    response
      .status(200)
      .json(functions.showTask(todos, index));
  });
});
app.delete('/todos', (request, response) => {
  functions.reset();
  response
    .status(301)
    .json({ result: 'Your list has been cleaned' });
});
app.post('/todos', (request, response) => {
  fs.readFile('./src/to-do.json', 'utf8', (error, data) => {
    const todos = data ? JSON.parse(data) : [];
    if (error) {
      console.log(error);
      response
        .status(500)
        .json({ result: 'error' });
      return;
    }
    functions.add(todos, request.body.task);
    response
      .status(201)
      .json({ result: 'added new task' });
  });
});
app.put('/todos/:id/done', (request, response) => {
  const index = request.params.id;
  fs.readFile('./src/to-do.json', 'utf8', (error, data) => {
    const todos = data ? JSON.parse(data) : [];
    if (error) {
      console.log(error);
      response
        .status(500)
        .json({ result: 'error' });
      return;
    }
    functions.update(todos, index, true);
    response
      .status(201)
      .json({ result: 'Your task is done' });
  });
});
app.put('/todos/:id/undone', (request, response) => {
  const index = request.params.id;
  fs.readFile('./src/to-do.json', 'utf8', (error, data) => {
    const todos = data ? JSON.parse(data) : [];
    if (error) {
      console.log(error);
      response
        .status(500)
        .json({ result: 'error' });
      return;
    }
    functions.update(todos, index, false);
    response
      .status(201)
      .json({ result: 'Your task is undone' });
  });
});
app.get('/todos', (request, response) => {
  fs.readFile('./src/to-do.json', 'utf8', (error, data) => {
    const todos = data ? JSON.parse(data) : [];
    if (error) {
      console.log(error);
      response
        .status(500)
        .json({ result: 'error' });
      return;
    }
    response
      .status(200)
      .json(todos);
  });
});
app.listen(3030, () => {
  console.log('Listening on the port 3030');
});
