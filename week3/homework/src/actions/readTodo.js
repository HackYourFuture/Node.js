'use strict';

function readTodo(todo, request, response) {
  const id = request.params.id;
  todo
    .readOne(id)
    .then(todo => {
      return response.json(todo);
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

module.exports = readTodo;
