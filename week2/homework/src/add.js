const todos = require('./readFile');
const writeTodos = require('./writeFile');

async function addTodo(newTodo) {
  const todosJson = await todos('todos.json');
  if (newTodo) {
    todosJson.push(newTodo);
    writeTodos(todosJson);
    console.log(`${newTodo} is successfully added to the list`);
  }
}

module.exports = addTodo;
