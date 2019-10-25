'use strict';

function readTodo(todo, request, response) {
  todo
    .read()
    .then(todos => {
      const id = request.params.id;
      const foundTodo = todos.find(todoElm => todoElm.id === id);
      if (foundTodo) {
        response.json(foundTodo);
        response.end();
      } else {
        response.status(404);
        response.json({ error: 'Not found' });
        response.end();
      }
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

module.exports = readTodo;
