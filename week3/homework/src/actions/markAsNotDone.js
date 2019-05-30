const { list, reset } = require('../helpFunctions');

async function markAsNotDone(request, response) {
  try {
    let todoList = await list().then(todoList => JSON.parse(todoList));
    const index = parseInt(request.params.id);
    todoList[index].done = false;
    await reset(todoList);
    response.status(201).send('Todo has been marked as NOT DONE');
  } catch (error) {
    response.status(404).send({ error: 'Not found' });
  }
}

module.exports = { markAsNotDone };
