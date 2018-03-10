'use strict';

function setError(response, error) {
  response.status(400);
  response.json({ error });
  response.end();
}

function deserializeTodo(request, response) {
  const { todo } = request.body;
  if (todo == null) {
    setError(response, 'Specify a to-do');
    return null;
  }

  if (todo.description != null)
    todo.description = todo.description.trim();

  if (todo.description == null || todo.description.length === 0) {
    setError(response, 'Specify a description');
    return null;
  }

  return todo;
};

module.exports = deserializeTodo;
