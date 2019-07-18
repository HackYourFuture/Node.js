'use strict';

async function deleteTodo(todo, request, response) {
  try {
    const id = request.params.id;

    await todo.delete(id);

    response.status(204);
    response.end();
  } catch ({ message, code }) {
    response.status(code);
    response.json({ error: message });
  }
}

module.exports = deleteTodo;
