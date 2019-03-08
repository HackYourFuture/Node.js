const controlIndex = require('./controlIndex');
const writeTodos = require('./writeFile');

function updateTodo(todoIndex, newValue) {
  controlIndex(todoIndex)
    .then(todosJson => {
      todoIndex--;
      const updated = todosJson.splice(todoIndex, 1, newValue);
      writeTodos(todosJson);
      console.log(`${updated} at index ${todoIndex + 1} is updated as ${newValue}`);
    })
    .catch(error => console.log(error.message));
}

module.exports = updateTodo;
