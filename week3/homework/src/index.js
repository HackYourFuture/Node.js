// 'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(express.json());

// get the list of todo
app.get('/todo', (req, res) => {
  fs.readFile('./todo.json', 'utf8', (error, data) => {
    if (error) return res.status(500).send('no data found');
    const todo = JSON.stringify(data);
    res.json(todo);
  });
});

// get todo by id number
app.get('/todo/:id', (req, res) => {
  fs.readFile('./todo.json', 'utf8', (error, data) => {
    if (error) return res.status(400).send(`No data with id : ${id} found !`);
    const id = req.param.id - 1;
    const todo = JSON.stringify(data)[id];
    res.json(todo);
  });
});

// add todo item
app.post('/todo', (req, res) => {
  fs.readFile('./todo.json', 'utf8', (error, contents) => {
    if (error) {
      res.status(500).send('There is an error');
    } else {
      const todo = JSON.parse(contents);
      const todoItem = {
        id: todo.length + 1,
        description: req.body.description,
        done: false,
      };
      todo.push(todoItem);
      const newTodo = JSON.stringify(todo);
      fs.writeFile('/todo.json', newTodo, error => {
        if (error) throw error;
      });
    }
  });
  res.send(newTodo);
});

// mark to do as done
app.delete('/todo/:id/true', (req, res) => {
  fs.readFile('./todo.json', 'utf8', (error, data) => {
    if (error) return res.status(400).send('id not found');
    const id = req.params.id - 1;
    const todo = JSON.parse(data);
    todo[id].done = true;
    const newTodo = JSON.stringify(todo);

    fs.writeFile('./todo.json', newTodo, error => {
      if (error) return res.status(500).send('there is an error');
      res.json(newTodo);
    });
  });
});

// mark todo as not done
app.delete('/todo/:id/false', (req, res) => {
  fs.readFile('./todo.json', 'utf8', (error, data) => {
    if (error) return res.status(400).send('id not found');
    const id = req.params.id - 1;
    const todo = JSON.parse(data);
    todo[id].done = false;
    const newTodo = JSON.stringify(todo);

    fs.writeFile('./todo.json', newTodo, error => {
      if (error) return res.status(500).send('there is an error');
      res.json(newTodo);
    });
  });
});

// delete todo by id number
app.delete('/todo/:id', (req, res) => {
  fs.readFile('./todo.json', 'utf8', (error, data) => {
    if (error) return res.status(400).send(` id : ${id} is not found !`);
    const todo = JSON.parse(data);
    const id = req.params.id - 1;
    todo.splice(id, 1);
    const newTodo = JSON.stringify(todo);

    fs.writeFile('./todo.json', 'utf8', newTodo, error => {
      if (error) throw error;
      res.json(newTodo);
    });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
});
