const todos = require('./readFile');

async function controlIndex(todoIndex) {
  const todosJson = await todos('todos.json');

  const index = Number(todoIndex);

  if (!Number.isInteger(index)) {
    const error = new Error(`Index ${todoIndex} is not a valid number. Please check the index!`);
    throw error;
  }

  if (index < 1 || index > todosJson.length) {
    const error = new Error(`Index ${index} is out of range. Please check the index!`);
    throw error;
  }

  return todosJson;
}

module.exports = controlIndex;
