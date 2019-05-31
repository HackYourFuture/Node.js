'use strict';

async function readTodo(todo, request, response) {
  try {
    let todoList = await todo.list().then(todoList => JSON.parse(todoList));
    const index = parseInt(request.params.id);
    if (index >= 0 && index < todoList.length) {
      response.status(200).send(todoList[index]);
    } else {
      response.status(404).send({ error: 'invalid id' });
    }
  } catch (error) {
    response.status(404).send({ error: 'Not found' });
  }
}

module.exports = readTodo;
