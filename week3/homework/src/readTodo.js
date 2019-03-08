'use strict';

function readTodo(todo, request, response) {
  const id = request.params.id;

  todo
    .read()
    .then(todos => todos.find(todo => todo.id === id))
    .then(todo => {
      if (todo == null) {
        const error = new Error(`To-do with ID ${id} does not exist`);
        error.code = 'not-found';
        throw error;
      }
      response.status(200);
      response.json({ todo });
      response.end();
    })
    .catch(({ message, code }) => {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });
}

module.exports = readTodo;
