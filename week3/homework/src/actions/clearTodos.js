'use strict';

async function clearTodos(todo, request, response) {
  try {
    await todo.reset([]);
    response.status(201).send('All to-dos have been removed');
  } catch (error) {
    response.status(404).send({ error: 'Not found' });
  }
}

module.exports = clearTodos;
