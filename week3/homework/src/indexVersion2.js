'use strict';

{
  const Express = require('express');
  const { promisify } = require('util');
  const fs = require('fs');
  const readFile = promisify(fs.readFile);
  const writeFile = promisify(fs.writeFile);

  const FILENAME = 'todos.json';
  const PORT = 3000;
  const TODO_SLUG = 'todos';
  const DONE = true;
  const NOT_DONE = false;

  const app = new Express();

  // Use built-in JSON middleware to automatically parse JSON
  app.use(Express.json());

  async function read(id) {
    const todos = await readFile(FILENAME, 'utf8');
    const todoList = todos ? JSON.parse(todos) : [];
    const todo = todoList.find(t => t.id === id);
    if (todo === null || todo === undefined) {
      const error = new Error(`To-do with ID: ${id} does not exist`);
      error.code = 'not-found';
      throw error;
    }
    return { todo, todoList };
  }

  async function readTodo(request, response) {
    try {
      const id = request.params.id;
      const { todo } = await read(id);
      response.json({ todo });
      response.end();
    } catch ({ message }) {
      response.status(500);
      response.json({ error: message });
    }
  }

  async function clearTodos(request, response) {
    const todos = [];
    try {
      await writeFile(FILENAME, JSON.stringify(todos, null, 2));
      response.json({ message: 'List cleared!' });
      response.status(204);
      response.end();
    } catch ({ message }) {
      response.status(500);
      response.json({ error: message });
    }
  }

  async function markTodo(request, response, done) {
    const id = request.params.id;
    try {
      const { todo, todoList } = await read(id);
      todo.done = done;
      await writeFile(FILENAME, JSON.stringify(todoList, null, 2));
      response.status(200);
      response.json({ todo });
      response.end();
    } catch ({ message, code }) {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    }
  }

  app.get(`/${TODO_SLUG}/:id`, (request, response) => readTodo(request, response));
  app.delete(`/${TODO_SLUG}`, (request, response) => clearTodos(request, response));
  app.post(`/${TODO_SLUG}/:id/done`, (request, response) => markTodo(request, response, DONE));
  app.delete(`/${TODO_SLUG}/:id/done`, (request, response) =>
    markTodo(request, response, NOT_DONE),
  );

  app.listen(PORT, error => {
    if (error) return console.error(error);

    console.log(`Server started on http://localhost:${PORT}`);
  });
}
