const controlIndex = require('./controlIndex');
const writeTodos = require('./writeFile');

function removeTodo(todoIndex) {
  controlIndex(todoIndex)
    .then(todosJson => {
      todoIndex--;
      const removed = todosJson.splice(todoIndex, 1);
      writeTodos(todosJson);
      console.log(`${removed} at index ${todoIndex + 1} is successfully removed`);
    })
    .catch(error => console.log(error.message));
}

module.exports = removeTodo;
