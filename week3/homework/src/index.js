'use strict';

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Read All Todos
app.get('/todos', (req, res) => {
  const db = require('./db');
  res.status(200).send({
    msg: 'All todos retrieved successfully',
    todos: db,
  });
});

// Get A Single Todo
app.get('/todo/:id', (req, res) => {
  const db = require('./db');
  const id = parseInt(req.params.id, 10);
  db.map(todo => {
    if (todo.id === id) {
      return res.status(200).send({
        message: 'todo successfully retrieved',
        todo,
      });
    }
  });
  return res.status(404).send({
    message: `Todo not found`,
  });
});

// Create Todo
app.post('/create/todos', (req, res) => {
  const db = require('./db');
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
    done: false,
  };

  db.push(todo);
  fs.writeFile('./db.json', JSON.stringify(db, null, 2), error => {
    if (error) throw error;
  });
  return res.status(201).send({
    message: 'todo added successfully',
    todo,
  });
});

// Delete Todo
app.delete('/delete/todo/:id', (req, res) => {
  const db = require('./db');
  const id = parseInt(req.params.id, 10);

  db.map((todo, index) => {
    if (todo.id === id) {
      db.splice(index, 1);
      return res.status(200).send({
        message: `Todo with id ${id} successfully deleted`,
      });
    }
  });
  fs.writeFile('./db.json', JSON.stringify(db, null, 2), error => {
    if (error) throw error;
  });
});

// Update Todo
app.put('/update/todo/:id', (req, res) => {
  const db = require('./db');
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
      message: `Todo with the id: ${id} not found`,
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
    message: `Todo with id: ${id} successfully updated!`,
    updatedTodo,
  });
});

// markAsDone
app.post('/todos/:id/done', (req, res) => {
  const fs = require('fs');
  const db = require('./db');

  const id = parseInt(req.params.id, 10);
  let todoFound;
  let itemIndex;
  db.map((todo, index) => {
    if (todo.id === id) {
      todoFound = todo;
      itemIndex = index;
    }
  });

  const updatedTodo = {
    id: todoFound.id,
    title: req.body.title || todoFound.title,
    description: req.body.description || todoFound.description,
  };

  todoFound.done = true;

  return res.status(201).send({
    message: `Todo with id: ${id} successfully set to done!`,
    updatedTodo,
  });
  fs.writeFile('./db.json', JSON.stringify(db, null, 2), error => {
    if (error) throw error;
  });
});

// markAsNotDone
app.delete('/delete/todos/:id/done', (req, res) => {
  const fs = require('fs');
  const db = require('./db');

  const id = parseInt(req.params.id, 10);
  let todoFound;
  let itemIndex;
  db.map((todo, index) => {
    if (todo.id === id) {
      todoFound = todo;
      itemIndex = index;
    }
  });

  const updatedTodo = {
    id: todoFound.id,
    title: req.body.title || todoFound.title,
    description: req.body.description || todoFound.description,
  };

  todoFound.done = false;

  return res.status(201).send({
    message: `Todo with id: ${id} successfully set to not done!`,
    updatedTodo,
  });
});

// Delete All Todos
app.delete('/delete/todos', (req, res) => {
  const db = require('./db');
  const fs = require('fs');
  fs.writeFile('./db.json', '[]', error => {
    return res.status(201).send('All todos have been removed');
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
