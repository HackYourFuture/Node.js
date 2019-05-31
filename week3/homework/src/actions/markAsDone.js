'use strict';

async function markAsDone(todo, request, response) {
  try {
    let todoList = await todo.list().then(todoList => JSON.parse(todoList));
    const index = parseInt(request.params.id);
    if (todoList[index].done === true) {
      response.status(404).send({ Failed: 'Todo is already marked as DONE' });
    } else {
      todoList[index].done = true;
      await todo.reset(todoList);
      response.status(201).send({ Succeeded: 'Todo has been marked as DONE' });
    }
  } catch (error) {
    response.status(404).send({ error: 'Not found' });
  }
}

module.exports = markAsDone;
