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
      response.status(404).send('');
    } else {
      const todos = todoList.trim() === '' ? [] : JSON.parse(todoList);
      todos.push({
        text: request.body.todo,
        done: 'false'
      });
      fs.writeFile('./todos.txt', JSON.stringify(todos), error => {
        if (error) {
          console.error(error);
          response.status(404).send('');
        } else {
          response.json({
            result: request.body.todo
          });
        }
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
      console.error(error);
      response.status(404).send('');
    } else if (id <= 0 || id > objTodoList.length) {
      response.status(406).send('id should be an index of todo item');
    } else {
      response.json({
        result: objTodoList[id - 1]
      });
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
      response.status(404).send('');
    } else if (id <= 0 || id > todos.length) {
      response.status(406).send('id should be an index of todo item');
    } else {
      todos[id - 1].done = 'true';
      todos.splice(id - 1, 1, todos[id - 1]);

      fs.writeFile('./todos.txt', JSON.stringify(todos), error => {
        if (error) {
          console.error(error)
          response.status(404).send('');
        } else {
          response.json({
            result: todos[id - 1]
          });
        }
      });
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
      response.status(404).send('');
    } else if (id <= 0 || id > todos.length) {
      response.status(406).send('id should be an index of todo item');
    } else {
      todos[id - 1].done = 'false';
      todos.splice(id - 1, 1, todos[id - 1]);

      fs.writeFile('./todos.txt', JSON.stringify(todos), error => {
        if (error) {
          console.error(error)
          response.status(404).send('');
        } else {
          response.json({
            result: todos[id - 1]
          });
        }
      });

    }
  });
});

//clearTodos (DELETE /todos)
// deletes todo list
app.delete('/todos', (request, response) => {
  fs.writeFile('./todos.txt', '', error => {
    if (error) {
      console.error(error);
      response.status(404).send('');
    } else {
      response.send('Todo list is deleted');
    }
  });
});

app.listen(3000, () => {
  console.log('Listening port 3000');
});