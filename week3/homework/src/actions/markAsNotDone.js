'use strict';

async function markAsNotDone(todo, request, response) {
  try {
    const todoList = await todo.list().then(todoList => JSON.parse(todoList));
    const index = parseInt(request.params.id);
    if (index > 0 && index <= todoList.length) {
      if (todoList[index - 1].done === false) {
        response.status(404).send({ Failed: 'Todo is already marked as NOT DONE' });
      } else {
        todoList[index - 1].done = false;
        await todo.reset(todoList);
        response.status(201).send({ Succeeded: 'Todo has been marked as NOT DONE' });
      }
    } else {
      response.status(400).send({ Failed: 'Please insert a valid id' });
    }
  } catch (error) {
    response.status(404).send({ error: 'Not found' });
  }
}

module.exports = markAsNotDone;
