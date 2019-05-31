'use strict';

async function markAsDone(todo, request, response) {
  try {
    let todoList = await todo.list().then(todoList => JSON.parse(todoList));
    const index = parseInt(request.params.id);
    todoList[index].done = true;
    await todo.reset(todoList);
    response.status(201).send('Todo has been marked as DONE');
  } catch (error) {
    response.status(404).send({ error: 'Not found' });
  }
}

module.exports = markAsDone;
