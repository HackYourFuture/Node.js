'use strict';

async function markAsNotDone(todo, request, response) {
  try {
    let todoList = await todo.list().then(todoList => JSON.parse(todoList));
    const index = parseInt(request.params.id);
    if (todoList[index].done === false) {
      response.status(404).send({ Failed: 'Todo is already marked as NOT DONE' });
    } else {
      todoList[index].done = false;
      await todo.reset(todoList);
      response.status(201).send({ Succeeded: 'Todo has been marked as NOT DONE' });
    }
  } catch (error) {
    response.status(404).send({ error: 'Not found' });
  }
}

module.exports = markAsNotDone;
