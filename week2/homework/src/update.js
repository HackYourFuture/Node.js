const todos = require('./readFile');
const writeTodos = require('./writeFile');

async function updateTodo(todoIndex, newValue) {
  const todosJson = await todos('todos.json');
  todoIndex--;
  if (todoIndex >= 0 && todoIndex < todosJson.length) {
    const updated = todosJson.splice(todoIndex, 1, newValue);
    writeTodos(todosJson);
    console.log(`${updated}at index ${todoIndex + 1} is updated as ${newValue}`);
  } else {
    console.log(`error: index: ${todoIndex + 1} is out of range. Please Check!`);
  }
}

module.exports = updateTodo;
