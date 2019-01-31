'use strict';

const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');
const port = 3000;

app.use(bodyParser.json());

const tasks = JSON.parse(data);
let id = uuid();

app.get('/todos', (request, response) => {
  fs.readFile('./todos.json', 'utf8', (error, data) => {
    if (error) {
      console.error(error);
    } else {
      response.json(tasks);
    }
  });
});

app.get('/todos/:id', (request, response) => {
  fs.readFile('./todos.json', 'utf8', (error, data) => {
    if (error) {
      console.error(error);
    } else {
      response.json(tasks[id]);
    }
  });
});

app.delete('/todos', (request, response) => {
  fs.readFile('./todo.json', 'utf8', (error, data) => {
    if (error) {
      console.error(error);
    } else {
      fs.writeFileSync('todo.json', '[]');
    }
  });
});

app.post('/todos/:item', (request, response) => {
  fs.readFile('./todo.json', 'utf8', (error, data) => {
    if (error) {
      console.error(error);
    } else {
      const newTask = { text: request.params.item };
      tasks.push(newTask);
      const newTasks = JSON.stringify(tasks);
      fs.writeFileSync('todo.json', newTasks);
      response.status(201);
    }
  });
});

app.delete('/todos/:id', (request, response) => {
  fs.readFile('./todo.json', 'utf8', (error, data) => {
    if (error) {
      console.error(error);
    } else {
      tasks.splice(id, 1);
      const newTasks = JSON.stringify(tasks);
      fs.writeFileSync('todo.json', newTasks);
    }
  });
});

app.post('/todos/:id/done', (request, response) => {
  fs.readFile('./todo.json', 'utf8', (error, data) => {
    if (error) {
      console.error(error);
    } else {
      // not sure how to finish this part!
    }
  });
});

app.listen(port);
