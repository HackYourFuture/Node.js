const { reset } = require('../helpFunctions');

async function clearTodos(request, response) {
  try {
    await reset([]);
    response.status(201).send('All to-dos have been removed');
  } catch (error) {
    response.status(404).send({ error: 'Not found' });
  }
}

module.exports = { clearTodos };
