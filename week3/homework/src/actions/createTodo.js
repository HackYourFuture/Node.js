'use strict';

async function createTodo(todo, request, response) {
  try {
    const todoText = todo.checkTodo(request);
    const newTodo = await todo.createSave(todoText);

    response.status(201);
    response.json({ todo: newTodo });
  } catch ({ message, error }) {
    response.status(400);
    response.json({ error: message });
  }
}

module.exports = createTodo;
