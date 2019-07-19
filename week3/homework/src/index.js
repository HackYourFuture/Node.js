'use strict';

const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Get A Single Todo
app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map(todo => {
    if (todo.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'todo successfully retrieved',
        todo,
      });
    }
  });
  return res.status(404).send({
    message: `Todo not found`,
  });
});

// Read All Todos
app.get('/all/todos', (req, res) => {
  res.status(200).send({
    success: 'true',
    msg: 'All todos retrieved successfully',
    todos: db,
  });
});

// Create Todo
app.post('/create/todos', (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'Please enter a valid title and description',
    });
  }
  const todo = {
    id: db.length + 1,
    title: req.body.title,
    description: req.body.description,
  };
  db.push(todo);
  return res.status(201).send({
    success: 'true',
    message: 'todo added successfully',
    todo,
  });
});

// Delete Todo
app.delete('/delete/todo/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.map((todo, index) => {
    if (todo.id === id) {
      db.splice(index, 1);
      return res.status(200).send({
        message: 'Todo successfully deleted',
      });
    }
  });

  return res.status(404).send({
    message: `Todo with id ${id} not found`,
  });
});

// Delete All Todo
app.delete('/delete/todos', (req, res) => {
  const fs = require('fs');
  fs.writeFile('./db.js', '[]', error => {
    return res.status(201).send('All todos have been removed');
  });
});

// Update Todo
app.put('/update/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let todoFound;
  let itemIndex;
  db.map((todo, index) => {
    if (todo.id === id) {
      todoFound = todo;
      itemIndex = index;
    }
  });

  if (!todoFound) {
    return res.status(404).send({
      message: `Todo with the id ${id} not found`,
    });
  }

  if (!req.body.title || !req.body.description) {
    return res.status(400).send({
      message: 'Please enter a valid title and description',
    });
  }

  const updatedTodo = {
    id: todoFound.id,
    title: req.body.title || todoFound.title,
    description: req.body.description || todoFound.description,
  };

  db.splice(itemIndex, 1, updatedTodo);

  return res.status(201).send({
    message: 'Todo updated successfully',
    updatedTodo,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
