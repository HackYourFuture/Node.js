'use strict';
const readFile = require('./readFile');
const addTodo = require('./addTodo');
const writeToFile = require('./writeToFile');
const update = require('./update');
const express = require('express');
const app = new express();
const fs = require('fs');

try {
  // check whether correct JSON is sent
  app.use((request, response, next) => {
    express.json()(request, response, error => {
      if (error) {
        return response.status(400).send('please send JSON in correct format: { "text" : "todo" }');
      }
      next();
    });
  });

  //index page
  app.get('/', (request, response) => {
    const promise = new Promise((resolve, reject) => {
      fs.readFile('./info.txt', 'utf8', (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
    promise
      .then(info => response.status(200).send(info))
      .catch(error => response.send(error.message));
  });

  // show all todos
  app.get('/todos', async (request, response) => {
    const todos = await readFile();
    response.send(todos);
  });
  //delete all todos
  app.delete('/todos', async (resquest, response) => {
    const todos = [];
    await writeToFile(todos);
    response.status(204).send('all todos deleted');
  });

  //set todo as done based on id
  app.post('/todos/:id/done', async (request, response) => {
    const id = request.params.id;
    const todos = await readFile();
    const idMatch = todos.filter(todo => {
      return todo.id === id;
    });
    if (idMatch.length === 0) {
      response.send('No such ID');
    } else {
      idMatch[0].done = true;
      response.status(201).send('set to done');
      writeToFile(todos);
    }
  });
  //set todo as undone based on id
  app.delete('/todos/:id/done', async (request, response) => {
    const id = request.params.id;
    const todos = await readFile();
    const idMatch = todos.filter(todo => {
      return todo.id === id;
    });
    if (idMatch.length === 0) {
      response.send('No such ID');
    } else {
      idMatch[0].done = false;
      response.status(204).send('set to undone');
      writeToFile(todos);
    }
  });

  //delete based on id
  app.delete('/todos/:id', async (request, response) => {
    const id = request.params.id;
    const todos = await readFile();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    if (filteredTodos.length === todos.length) {
      response.status(200).send('id does not exist');
    } else {
      await writeToFile(filteredTodos);
      response.status(204).send('deleted');
    }
  });

  //add todo

  app.post('/todos', async (request, response) => {
    const todos = await readFile();
    const todo = request.body;
    const key = Object.keys(todo);
    if (key.length != 1 || key[0] != 'text' || typeof todo[key] == !'string') {
      response.status(400).send('please send in correct JSON format : "text":"todo"');
    } else {
      const addedTodo = await addTodo(todos, todo);
      writeToFile(addedTodo);
      response.sendStatus(201);
    }
  });
  // update based on todo id

  app.post('/todos/:id/update', async (request, response) => {
    const id = request.params.id;
    const todo = request.body;
    const key = Object.keys(todo);
    if (key.length != 1 || key[0] != 'text' || typeof todo[key] == !'string') {
      response.status(400).send('please send in correct JSON format : "text":"todo"');
    } else {
      const todos = await readFile();
      const updatedTodos = await update(todos, todo, id, response);
      writeToFile(updatedTodos);
      response.status(201);
    }
  });

  app.listen(3000, error => {
    if (error) return console.error(error);

    console.log(`Server started on http://localhost:3000`);
  });
} catch (error) {
  response.send('An error ocurred');
  console.error(erro.message);
}
