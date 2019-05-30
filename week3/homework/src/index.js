'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

// addTodo(POST / todos /)
//adds todo item
app.post('/todos', (request, response) => {
  fs.closeSync(fs.openSync('./todos.txt', 'a'));
  fs.readFile('./todos.txt', 'utf8', (error, todoList) => {
    if (error) {
      console.error(error);
    } else {
      const todos = todoList.trim() == '' ? [] : JSON.parse(todoList);
      todos.push({
        text: request.body.todo,
        done: '',
      });
      fs.writeFile('./todos.txt', JSON.stringify(todos), error => {
        console.error(error);
        response.json({ result: request.body.todo });
      });
    }
  });
});

// readTodo(GET / todos /: id /)
// reads todo list
app.get('/todos/:id', (request, response) => {
  fs.readFile('./todos.txt', 'utf8', (error, todoList) => {
    const id = request.params.id;
    const objTodoList = JSON.parse(todoList);

    if (error) {
      if (error.code === 'ENOENT') {
        console.log('no data found');
        response.status(404).send('');
      } else console.error(error);
    } else if (id < 0 || id >= objTodoList.length) {
      response.send('id should be an index of todo item');
    } else {
      response.json({ result: objTodoList[id] });
    }
  });
});

// markAsDone(POST / todos /: id / done)
// Sets the done flag of a single to-do to true
app.post('/todos/:id/done', (request, response) => {
  fs.readFile('./todos.txt', 'utf8', (error, todoList) => {
    const id = request.params.id;
    const todos = JSON.parse(todoList);
    if (error) {
      console.error(error);
    } else if (id < 0 || id >= todos.length) {
      response.send('id should be an index of todo item');
    } else {
      todos[id].done = 'true';
      response.json({ result: todos[id] });
    }
  });
});

// markAsNotDone(DELETE / todos /: id / done)
// Sets the done flag of a single to-do to false
app.delete('/todos/:id/done', (request, response) => {
  fs.readFile('./todos.txt', 'utf8', (error, todoList) => {
    const id = request.params.id;
    const todos = JSON.parse(todoList);
    if (error) {
      console.error(error);
    } else if (id < 0 || id >= todos.length) {
      response.send('id should be an index of todo item');
    } else {
      todos[id].done = 'false';
      response.json({ result: todos[id] });
    }
  });
});

//clearTodos (DELETE /todos)
// deletes todo list
app.delete('/todos', (request, response) => {
  fs.writeFile('./todos.txt', '', error => {
    if (error) {
      console.error(error);
    } else {
      response.send('Todo list is deleted');
    }
  });
});

app.listen(3000, () => {
  console.log('Listening port 3000');
});
