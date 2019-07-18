'use strict';

async function updateTodo(todo, request, response) {
  try {
    const id = request.params.id;
    const todoText = todo.checkTodo(request);
    const newTodo = await todo.update(id, todoText);

    response.status(200);
    response.json(newTodo);
  } catch ({ message, code }) {
    response.status(code);
    response.json({ error: message });
  }
}

module.exports = updateTodo;
