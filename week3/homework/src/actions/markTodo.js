'use strict';

async function markTodo(todo, request, response) {
  try {
    const id = request.params.id;

    if (request.method === 'POST') {
      await todo.mark(id, true);
      response.status(201);
    } else if (request.method === 'DELETE') {
      await todo.mark(id, false);
      response.status(204);
    }

    response.end();
  } catch ({ message, code }) {
    response.status(code);
    response.json({ error: message });
  }
}

module.exports = markTodo;
