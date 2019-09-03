'use strict';

{
  const express = require('express');
  const uuid = require('uuid');
  const fs = require('fs');

  const app = express();

  app.use(express.json());

  function readTodosFromFile() {
    return new Promise((resolve, reject) => {
      fs.readFile('todos.json', 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data));
      });
    });
  }

  function saveTodos(todos) {
    return new Promise((resolve, reject) => {
      fs.writeFile('todos.json', JSON.stringify(todos), 'utf8', err => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  function parseAndValidate(request) {
    const { todo } = request.body;
    if (todo == null) throw Error;
    if (todo.description != null) todo.description = todo.description.trim();
    if (todo.description == null || todo.description.length < 3) throw Error;
    return todo;
  }

  async function readTodos(req, res) {
    const todos = await readTodosFromFile();
    res.send(todos);
  }

  // Add a todo and todo.description in req.body to create todos
  async function createTodo(req, res) {
    const todo = parseAndValidate(req);
    const todos = await readTodosFromFile();
    todo.id = uuid.v4();
    todo.isDone = false;
    todos.push(todo);
    await saveTodos(todos);
    markAsNotDone(req, res);
    res.status = 201;
    res.end('Task is created');
  }

  async function updateTodo(req, res) {
    const updatedTodo = parseAndValidate(req);
    const todos = await readTodosFromFile();
    const originalTodo = todos.find(todo => todo.id === req.params.id);
    originalTodo.description = updatedTodo.description;
    await saveTodos(todos);
    res.status = 201;
    res.end('Task is updated');
  }

  async function deleteTodo(req, res) {
    const todos = await readTodosFromFile();
    const todo = todos.find(todo1 => todo1.id === req.params.id);
    const indexToDelete = todos.indexOf(todo);
    todos.splice(indexToDelete, 1);
    await saveTodos(todos);
    res.status = 200;
    res.end('Task is deleted');
  }

  // Homework starts here
  async function readTodo(req, res) {
    const todos = await readTodosFromFile();
    const todo = todos.find(task => task.id === req.params.id);
    res.send(todo);
  }

  async function clearTodos(req, res) {
    await saveTodos([]);
    res.status = 200;
    res.end('Todo list is empty');
  }

  async function markAsDone(req, res) {
    const todos = await readTodosFromFile();
    const todo = todos.find(task => task.id === req.params.id);
    todo.isDone = true;
    await saveTodos(todos);
    res.status = 201;
    res.end('Task is done');
  }

  async function markAsNotDone(req, res) {
    const todos = await readTodosFromFile();
    const todo = todos.find(task => task.id === req.params.id);
    todo.isDone = false;
    await saveTodos(todos);
    res.status = 201;
    res.end('Task is not done');
  }

  app.get('/todos', (req, res) => {
    readTodos(req, res);
  });
  app.post('/todos', (req, res) => {
    createTodo(req, res);
  });
  app.put('/todos/:id', (req, res) => {
    updateTodo(req, res);
  });
  app.delete('/todos/:id', (req, res) => {
    deleteTodo(req, res);
  });

  // Homework starts here
  app.get('/todos/:id', (req, res) => {
    readTodo(req, res);
  });
  app.delete('/todos', (req, res) => {
    clearTodos(req, res);
  });
  app.post('/todos/:id/done', (req, res) => {
    markAsDone(req, res);
  });
  app.delete('/todos/:id/done', (req, res) => {
    markAsNotDone(req, res);
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`Listening on port ${port}`));
}
