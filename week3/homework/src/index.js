'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

app.get('/todo/:id', (request, response) => {
  fs.readFile('./todos.json', 'utf8', (error, todo) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('no data found');
      } else console.error(error);
      response.status(404).send('');
    } else {
      const newList = todo.split('\n');
      const id = request.params.id;
      response.json({ result: newList[id] });
    }
  });
});

app.delete('/todo/:id', (request, response) => {
  const id = request.params.id;
  fs.readFile('./todos.json', 'utf8', (error, todosBinary) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('no data found');
      } else console.error(error);
      response.status(404).send('');
    } else {
      const todos = JSON.parse(todosBinary);
      todos.splice(id - 1, 1);

      fs.writeFile('./todos.json', JSON.stringify(todos), error => {
        console.error(error);
        console.log('Todo item is deleted');
        response.status(201).json({ result: request.body.todo });
      });
    }
  });
});

app.post('/todo', (request, response) => {
  const todoItem = request.body.todo;

  fs.readFile('./todos.json', 'utf8', (error, todosBinary) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('no data found');
      } else response.status(404).send('');
      console.error(error);
    } else {
      const todos = todosBinary.trim() !== '' ? JSON.parse(todosBinary) : [];
      todos.push({
        text: request.body.todo,
        done: false,
      });

      fs.writeFile('./todos.json', JSON.stringify(todos), error => {
        console.error(error);
        console.log('Todo item is added');
        response.status(201).json({ result: request.body.todo });
      });
    }
  });
});
app.delete('/todo', (request, response) => {
  fs.readFile('./todos.json', 'utf8', (err, data) => {
    if (err) throw err;
    fs.writeFile('./todos.json', '', err => {
      if (err) throw err;
      console.log('File deleted!');
    });
  });
});

app.put('/todo/done/:id', (request, response) => {
  fs.readFile('./todos.json', 'utf8', (error, data) => {
    const todos = JSON.parse(data);
    const id = request.params.id;
    todos[id - 1]['done'] = true;
    fs.writeFile('./todos.json', JSON.stringify(todos), error => {
      console.error(error);
      console.log('Item Marked as Done');
      response.status(201).json({ result: request.body.todo });
    });
  });
});

app.put('/todo/notDone/:id', (request, response) => {
  fs.readFile('./todos.json', 'utf8', (error, data) => {
    const todos = JSON.parse(data);
    const id = request.params.id;
    todos[id - 1]['done'] = false;
    fs.writeFile('./todos.json', JSON.stringify(todos), error => {
      console.error(error);
      console.log('Item Marked as Not Done');
      response.status(201).json({ result: request.body.todo });
    });
  });
});

app.listen(3000, () => {
  console.log('Listening port 3000');
});
