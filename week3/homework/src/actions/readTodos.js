'use strict';

async function readTodos(todo, request, response) {
  try {
    const id = request.params.id;

    const todos = await todo.read(id);
    response.send({ todos });
    response.end();
  } catch ({ message, code }) {
    response.status(code);
    response.json({ error: message });
  }
}

module.exports = readTodos;
