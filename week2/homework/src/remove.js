const todos = require('./readFile');
const writeTodos = require('./writeFile');

async function removeTodo(todoIndex) {
  const todosJson = await todos('todos.json');
  todoIndex--;
  if (todoIndex >= 0 && todoIndex < todosJson.length) {
    const removed = todosJson.splice(todoIndex, 1);
    writeTodos(todosJson);
    console.log(`${removed} at index ${todoIndex + 1} is successfully removed`);
  } else {
    console.log(`error: index ${todoIndex + 1} is out of range. Please Check!`);
  }
}

module.exports = removeTodo;
