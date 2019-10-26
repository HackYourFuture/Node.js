'use strict';

async function markAsDone(todo, request, response) {
  try {
    const todoId = request.params.id;

    if (request.method === 'POST') {
      const markedTrueTodo = await todo.markTodo(todoId, true);
      response.status(201).send(markedTrueTodo);
    } else if (request.method === 'DELETE') {
      const markedFalseTodo = await todo.markTodo(todoId, false);
      response.status(204).send(markedFalseTodo);
    }
    response.end();
  } catch ({ message }) {
    response.status(500);
    response.json({ error: message });
  }
}

module.exports = markAsDone;
