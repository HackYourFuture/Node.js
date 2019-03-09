'use strict';

function readTodo(todo, request, response) {
  todo
    .read()
    .then(todos => {
      const oneTodo = todos.filter(todo => todo.id === request.params.id);
      response.json({ oneTodo });
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}
// to be done.

module.exports = readTodo;
