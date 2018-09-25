'use strict';

async function deserializeTodo({ body }) {
  const { todo } = body;
  if (todo == null) throw new Error('todo not set');
  if (todo.description != null) todo.description = todo.description.trim();
  if (todo.description == null || todo.description.length === 0)
    throw new Error('description not set');
  return todo;
}

function createTodo(todo, request, response) {
  deserializeTodo(request, response)
    .then(({ description }) => {
      return todo.create(description);
    })
    .then(todo => {
      response.status(201);
      response.json({ todo });
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

function readTodos(todo, request, response) {
  todo
    .read()
    .then(todos => {
      response.json({ todos });
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

function updateTodo(todo, request, response) {
  deserializeTodo(request, response)
    .then(({ description }) => {
      const id = request.params.id;
      return todo.update(id, description);
    })
    .then(todo => {
      response.status(200);
      response.json({ todo });
    })
    .catch(({ message, code }) => {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });
}
function deleteTodo(todo, { params }, response) {
  const id = params.id;
  todo
    .delete_(id)
    .then(() => {
      response.status(204);
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

function readTodo(todo, { params }, response) {
  const id = params.id;
  todo
    .readOne(id)
    .then(todos => {
      response.json({ todos });
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}
function clearTodos(todo, request, response) {
  todo
    .clearJson()
    .then(() => {
      response.status(204);
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}
function markAsDone(todo, { params }, response) {
  const id = params.id;
  return todo
    .setTheFlag(id, true)
    .then(todo => {
      response.status(201);
      response.json({ todo });
    })
    .catch(({ message, code }) => {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });
}
function markAsNotDone(todo, { params }, response) {
  const id = params.id;
  return todo
    .setTheFlag(id, false)
    .then(todo => {
      response.status(204);
      response.json({ todo });
    })
    .catch(({ message, code }) => {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });
}
module.exports = {
  createTodo,
  readTodos,
  updateTodo,
  deleteTodo,
  readTodo,
  clearTodos,
  markAsDone,
  markAsNotDone
};
