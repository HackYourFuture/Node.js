'use strict';

async function readTodo(todo, request, response) {
  const id = request.params.id;

  todo
    .readID(id)
    .then(todos => {
      response.json({ todos });
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

module.exports = readTodo;
