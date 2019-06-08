'use strict';

async function readTodo(todo, request, response) {
  try {
    const todoList = await todo.list().then(todoList => JSON.parse(todoList));
    const index = parseInt(request.params.id);
    if (index > 0 && index <= todoList.length) {
      response.status(200).send(todoList[index - 1]);
    } else {
      response.status(400).send({ Failed: 'Please insert a valid id' });
    }
  } catch (error) {
    response.status(404).send({ error: 'Not found' });
  }
}

module.exports = readTodo;
