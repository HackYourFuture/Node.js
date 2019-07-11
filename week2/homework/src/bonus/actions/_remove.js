'use strict';

const Util = require('../helpers/Util');

async function remove(filePath, line) {
  /* eslint brace-style: 2 */
  try {
    const todosJSON = await Util.getJSONFromFile(filePath);

    const todoList = todosJSON.todos;

    if (isNaN(line)) {
      return console.log(`'${line}' is not an expected number value!`);
    }

    if (todoList.length === 0) {
      return console.log('The file is already empty!');
    }

    if (line > todoList.length) {
      return console.log(
        `You can't remove line '${line}'. Maximum line number is '${todoList.length}'`
      );
    }

    const removedTodo = todoList.splice(line - 1, 1);

    (async() => {
      await Util.write(filePath, JSON.stringify(todosJSON));
      console.log(`'${line}. ${removedTodo}' has been succesfully removed.`);
    })();
  } catch (error) {
    console.log(error);
  }
}

module.exports = remove;
