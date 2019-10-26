'use strict';

function readTodo(todo, request, response) {
  const todoId = request.params.id;
  todo
    .read()
    .then(todos => {
      const foundTodo = todos.find(todo => todo.id === todoId);
      if (foundTodo) {
        response.send(foundTodo);
      } else {
        response.status(404).send({ message: `toDo with id ${todoId} not found` });
      }
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

module.exports = readTodo;
