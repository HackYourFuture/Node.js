'use strict';

function readOne(todo, request, response) {
  todo
    .read()
    .then(todos => {
      const singleTodo = todos.filter(todo => todo.id === request.params.id);
      response.json({ singleTodo });
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

module.exports = readOne;
